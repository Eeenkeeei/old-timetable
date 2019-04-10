import Http from "./http.js";
import {ServerLink} from "./serverLink.js";



export class RenderTaskList {
    renderTasks(user) {
        const serverLink = new ServerLink();
        const http = new Http(serverLink.link);
        const tasks = user.tasks;
        const tasksInner = document.querySelector('#tasksInner');
        tasksInner.innerHTML = '';
        for (const task of tasks) {
            console.log(task);
            const tags = task.tags;
            let tagsToRender = '';
            for (const {tagText, tagClass} of tags) {
                console.log(tagText, tagClass);
                tagsToRender += `<label class="badge badge-${tagClass} text-uppercase" style=" font-size: 1rem; margin-left: 4px">
                                           ${tagText} 
                                        </label>`
            }
            const taskItem = document.createElement('div');
            taskItem.innerHTML = `
            <div class="row fadeIn wow animated">
           
            <div class="col-xs-4 col-sm-12 col-md-12 col-lg-3 col-xl-3 h5">
            ${task.taskName}
            </div>
            <div class="col-xs-4 col-sm-12 col-md-12 col-lg-3 col-xl-4 h5">
            ${task.taskNote}
            </div>
            <div class="col-xs-4 col-sm-12 col-md-12 col-lg-3 col-xl-5">
            ${tagsToRender}
            <button class="btn btn-outline-dark btn-sm" type="button" id="deleteTask">Удалить</button>
            </div>
            
            </div>
             <div class="col-12">
            <hr>
            </div>
            `;
            tasksInner.appendChild(taskItem);

            const deleteTaskButtonEl = taskItem.querySelector('#deleteTask');
            const deleteTaskListener = async () => {
                console.log(task.taskName, task.taskNote);
                console.log(tasks.indexOf(task));

                user.tasks.splice(tasks.indexOf(task), 1);
                console.log(user);

                let update = await http.timetableUpdate(user);

                let _resultUpdateFlag = '';
                await update.json().then(async (data) => {
                    _resultUpdateFlag = data;

                    await console.log(data);
                    this.renderTasks(user);
                });

                if (_resultUpdateFlag === 'Timetable Updated') {

                    msgEl.innerHTML = '';
                    msgEl.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show shadow-sm" id="errorEl" role="alert">
                <strong>Данные обновлены</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `;
                }
            };
            deleteTaskButtonEl.addEventListener('click', deleteTaskListener);

        }
    }
}
