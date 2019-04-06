import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const storage = new DataStorage(new LocalStorage());
import {ServerLink} from "./serverLink.js";
import {RenderTags} from "./renderTagList.js";

const serverLink = new ServerLink();
const http = new Http(serverLink.link);
const renderTagList = new RenderTags();

export class AddTag {
    constructor() {
        let editAddTagFlag = false;
    }


    renderAddTagForm(user) {
        const addNewTagLabel = document.querySelector('#addNewTag');
        const addNewTagInner = document.querySelector('#addNewTagInner');
        const serviceMsgEl = document.createElement('label');
        serviceMsgEl.innerHTML = '';
        let selectedColor = 'primary';
        let selectedColorIndicator = 'Выберите цвет';
        const addNewTagLabelListener = (evt) => {
            addNewTagInner.innerHTML = ` 
            <form class="fadeIn wow animated" id="addTagForm">
  <div class="form-group">
    <label class="text-muted">Не менее 3 символов</label>
    <input  type="text" class="form-control form-control-sm" id="tagName">
  </div>
  <div class="form-group">

    <label id="colorIndicatorLabel">Выберите цвет тега</label> 
    <p>
    <span class="badge badge-primary tagsSize" id="primaryColor">Синий</span>
<span class="badge badge-secondary tagsSize" id="secondaryColor">Серый</span>
<span class="badge badge-success tagsSize" id="successColor">Зеленый</span>
<span class="badge badge-danger tagsSize" id="dangerColor">Красный</span>
<span class="badge badge-warning tagsSize" id="warningColor">Оранжевый</span>
<span class="badge badge-info tagsSize" id="infoColor">Бирюзовый</span>
<span class="badge badge-light tagsSize" id="lightColor">Белый</span>
<span class="badge badge-dark tagsSize" id="darkColor">Черный</span>
    </p>
  </div>
  
  <button type="submit" class="btn btn-outline-dark btn-sm">Сохранить</button>
  <button type="button" class="btn btn-outline-dark btn-sm" id="hideAddTagForm">Отменить</button>
</form>
            `;
            const colorIndicatorEl = document.querySelector('#colorIndicatorLabel');
            const primaryColorEl = document.querySelector('#primaryColor');
            primaryColorEl.addEventListener('click', ()=>{
                selectedColor = 'primary';
                selectedColorIndicator = 'badge badge-primary tagsSize';
                colorIndicatorEl.className = selectedColorIndicator;
            });
            const secondaryColorEl = document.querySelector('#secondaryColor');
            secondaryColorEl.addEventListener('click', ()=>{
                selectedColor = 'secondary';
                selectedColorIndicator = 'badge badge-secondary tagsSize';
                colorIndicatorEl.className = selectedColorIndicator;
            });
            const successColorEl = document.querySelector('#successColor');
            successColorEl.addEventListener('click', ()=>{
                selectedColor = 'success';
                selectedColorIndicator = 'badge badge-success tagsSize';
                colorIndicatorEl.className = selectedColorIndicator;
            });
            const dangerColorEl = document.querySelector('#dangerColor');
            dangerColorEl.addEventListener('click', ()=>{
                selectedColor = 'danger';
                selectedColorIndicator = 'badge badge-danger tagsSize';
                colorIndicatorEl.className = selectedColorIndicator;
            });
            const warningColorEl = document.querySelector('#warningColor');
            warningColorEl.addEventListener('click', ()=>{
                selectedColor = 'warning';
                selectedColorIndicator = 'badge badge-warning tagsSize';
                colorIndicatorEl.className = selectedColorIndicator;
            });
            const infoColorEl = document.querySelector('#infoColor');
            infoColorEl.addEventListener('click', ()=>{
                selectedColor = 'info';
                selectedColorIndicator = 'badge badge-info tagsSize';
                colorIndicatorEl.className = selectedColorIndicator;
            });
            const lightColorEl = document.querySelector('#lightColor');
            lightColorEl.addEventListener('click', ()=>{
                selectedColor = 'light';
                selectedColorIndicator = 'badge badge-light tagsSize';
                colorIndicatorEl.className = selectedColorIndicator;
            });
            const darkColorEl = document.querySelector('#darkColor');
            darkColorEl.addEventListener('click', ()=>{
                selectedColor = 'dark';
                selectedColorIndicator = 'badge badge-dark tagsSize';
                colorIndicatorEl.className = selectedColorIndicator;
            });

            const addTagFormEl = document.querySelector('#addTagForm');
            const addTagFormListener = async (evt) => {
                evt.preventDefault();
                const tagNameEl = document.querySelector('#tagName');
                const tagName = tagNameEl.value;
                if (tagName.length < 3){
                    tagNameEl.className = 'form-control form-control-sm is-invalid';
                    return;
                }
                const newTagObject = {
                    tagText: tagName,
                    tagClass: selectedColor
                };
                user.noteTags.push(newTagObject);
                console.log(newTagObject);
                const data = new Link(user);
                storage.add(data);
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
                                        <label class="text-muted account-label fadeIn wow animated"><h6>ДЛЯ ИЗМЕНЕНИЯ КЛИКНИТЕ НА ВРЕМЯ</h6></label>
                                    `;
                    },4000);
                    _resultUpdateFlag = data;
                    await console.log(data);
                    addNewTagInner.className = 'account-label h6 fadeOut wow animated';
                    setTimeout(() => {
                        addNewTagInner.innerHTML = '';
                        addNewTagInner.className = 'account-label h6';
                    }, 800);
                    renderTagList.renderTagList(user);
                });
            };
            addTagFormEl.addEventListener('submit', addTagFormListener);


            const hideAddTagFormButton = document.querySelector('#hideAddTagForm');
            const hideAddTagFormListener = (evt) => {
                addNewTagInner.className = 'account-label h6 fadeOut wow animated';
                setTimeout(() => {
                    addNewTagInner.innerHTML = '';
                    addNewTagInner.className = 'account-label h6';
                }, 800);
                renderTagList.renderTagList(user);
            };
            hideAddTagFormButton.addEventListener('click', hideAddTagFormListener);
        };


        addNewTagLabel.addEventListener('click', addNewTagLabelListener)
    }

}
