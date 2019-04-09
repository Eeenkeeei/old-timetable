import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const storage = new DataStorage(new LocalStorage());
import {ServerLink} from "./serverLink.js";

const serverLink = new ServerLink();
const http = new Http(serverLink.link);

export class RenderTags {
    constructor() {
        let editTagFlag = false;
    }


    renderTagsForAccount(user) {
        const addNewTagInner = document.querySelector('#addNewTagInner');
        const serviceMsgEl = document.createElement('label');
        serviceMsgEl.innerHTML = '';
        const tagsInnerEl = document.querySelector('#tagsInner');
        let tags = user.noteTags;
        tagsInnerEl.innerHTML = '';
        tags.forEach(({tagText, tagClass}) => {
            const tagItem = document.createElement('span');
            tagItem.innerHTML = `
                                        <label class="badge badge-${tagClass} text-uppercase" style=" font-size: 1rem; cursor: pointer">
                                           ${tagText} <span aria-hidden="true" id="removeTag">&times;</span>
                                        </label>
                                        
            `;
            tagsInnerEl.appendChild(tagItem);
            const removeTagEl = tagItem.querySelector('#removeTag');
            const removeTagListener = async (evt) => {
                const removingObject = {
                    tagText: tagText,
                    tagClass: tagClass
                };
                for (const tag of tags) {
                    if (tag.tagText === tagText && tag.tagClass === tagClass){
                        console.log(tags.indexOf(tag));
                        user.noteTags.splice(tags.indexOf(tag), 1);
                        let updateData = await http.updateData(user);
                        let _resultUpdateFlag = '';
                        const tagMsgLabelEl = document.querySelector('#tagMsgLabel');
                        tagMsgLabelEl.innerHTML = '';
                        tagMsgLabelEl.appendChild(serviceMsgEl);
                        serviceMsgEl.innerHTML = `
                                        <label class="text-muted account-label fadeIn wow animated"><h6>Данные обновлены</h6></label>
                                        `;
                        await updateData.json().then(async (data) => {

                            setTimeout(()=>{
                                serviceMsgEl.innerHTML = `
                                        <label class="text-muted account-label fadeOut wow animated"><h6>Данные обновлены</h6></label>
                                    `
                            },4000);
                            _resultUpdateFlag = data;
                            await console.log(data);
                            addNewTagInner.className = 'account-label h6 fadeOut wow animated';
                            setTimeout(() => {
                                addNewTagInner.innerHTML = '';
                                addNewTagInner.className = 'account-label h6';
                            }, 800);
                            this.renderTagsForAccount(user);
                        });
                    }
                }
                console.log(tags)
            };
            removeTagEl.addEventListener('click', removeTagListener)
        });
    }
}
