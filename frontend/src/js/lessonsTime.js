import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const storage = new DataStorage(new LocalStorage());

import {ServerLink} from "./serverLink.js";
const serverLink = new ServerLink();
const http = new Http(serverLink.link);

export class LessonsTime {
    constructor() {
        let editTimeFlag = false;
    }


    renderLessonsTime(user) {
        const serviceMsgEl = document.createElement('label');
        serviceMsgEl.innerHTML = '';
        const lessonsTimetableInnerEl = document.querySelector('#lessonsTimetableInner');
        let timetable = user.lessonsTimetable;
        lessonsTimetableInnerEl.innerHTML = '';
        timetable.forEach(({start, end, number}) => {
            const timeItem = document.createElement('div');
            timeItem.innerHTML = `
            <div class="row">
                                        <div class="col-2 col-sm-2 col-md-2 h6" style="padding: 0px !important; cursor: pointer">
                                            ${start}
                                        </div>
                                        <div class="col-1 col-sm-1 col-md-1 h6" style="padding: 0px !important;">
                                        -
                                        </div>
                                        <div class="col-2 col-sm-2 col-md-2 h6" style="padding: 0px !important; cursor: pointer">
                                            ${end}
                                        </div>
                                    </div>  
            `;
            lessonsTimetableInnerEl.appendChild(timeItem);

            const timeItemListener = () => {
                if (this.editTimeFlag === true) {
                    return
                } else {
                    this.editTimeFlag = true;
                    timeItem.removeEventListener('click', timeItemListener);
                    timeItem.innerHTML = `
                <div class="row">
                <form id="changeTimeForm" class="fadeIn wow animated">
                      <div class="row">
                          <div class="col-3 col-sm-3 col-md-3 col-md-3 col-lg-3 col-xl-3" style="padding-right: 0px">
                              <input type="text" class="form-control form-control-sm" value="${start}" id="startTime">
                          </div>
                          <div class="col-1" style="padding-left: 10px">
                          <label class="text-center">-</label>
                            </div>
                          <div class="col-3" style="padding-left: 0px">
                               <input type="text" class="form-control form-control-sm" value="${end}" id="endTime">
                          </div>
                          
                          <div class="col-3">
                          <button type="submit" class="btn btn-outline-dark btn-sm">Сохранить</button>
                          </div>
                      </div>
                </form>
                </div> 
                `;
                    const startTimeEl = document.querySelector('#startTime');
                    const endTimeEl = document.querySelector('#endTime');
                    const changeTimeFormEl = document.querySelector('#changeTimeForm');
                    const changeTimeFormListener = async (evt) => {
                        evt.preventDefault();
                        const startTime = startTimeEl.value;
                        const endTime = endTimeEl.value;
                        const lessonNumber = number;
                        for (const timetableElement of timetable) {
                            if (timetableElement.number === lessonNumber){
                                user.lessonsTimetable[timetable.indexOf(timetableElement)].start = startTime;
                                user.lessonsTimetable[timetable.indexOf(timetableElement)].end = endTime;
                                const data = new Link(user);
                                storage.add(data);
                                let updateData = await http.updateData(user);
                                let _resultUpdateFlag = '';
                                const timetableLabelEl = document.querySelector('#timetableLabel');
                                timetableLabelEl.innerHTML = '';
                                timetableLabelEl.appendChild(serviceMsgEl);
                                serviceMsgEl.innerHTML = `
                                        <label class="text-muted account-label fadeIn wow animated"><h6>Данные обновлены</h6></label>
                                        `;
                                await updateData.json().then(async (data) => {


                                    setTimeout(()=>{
                                        serviceMsgEl.innerHTML = `
                                        <label class="text-muted account-label fadeOut wow animated"><h6>Данные обновлены</h6></label>
                                    `;
                                    },4000);
                                    _resultUpdateFlag = data;
                                    await console.log(data);
                                });
                            }
                        }

                        this.renderLessonsTime(user);
                        this.editTimeFlag = false;
                    };
                    changeTimeFormEl.addEventListener('submit', changeTimeFormListener)
                }
            };
            timeItem.addEventListener('click', timeItemListener)
        });

    }
}
