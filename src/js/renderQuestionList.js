import Http from "./http.js";
import {ServerLink} from "./serverLink.js";

export default class RenderQuestionList {
    renderQuestionList(user){
        const serverLink = new ServerLink();
        const http = new Http(serverLink.link);
        const innerQuestionList = document.querySelector('#innerForQuestions');
        innerQuestionList.innerHTML = '';
        let questionList = user.support;
        for (const questionListElement of questionList) {
            let responseText = '';
            if (questionListElement.status === 'false'){
                responseText = `
                <span class="h5 text-muted"><span class="badge-danger badge" style="border-radius: 50%; height: 1rem; width: 1rem"> </span> На ваш вопрос ответят в течение 8 часов. Пожалуйста, проверьте ответ позже</span>
                `
            } else
            {
                responseText = `
                <span class="h5"><span class="badge-success badge" style="border-radius: 50%; height: 1rem; width: 1rem"> </span> ${questionListElement.status}</span>
                `
            }
            const questionItem = document.createElement('div');
            questionItem.innerHTML = `
            <div class="row fadeIn wow animated" >
                <div class="col-12 ">
                     <hr>
                </div>
                <label class="col-sm-4 h6 text-muted account-label">Тема обращения</label>
                <div class="col-sm-8">
                     <label class="h5 text-uppercase">${questionListElement.theme}</label>
                </div>
                <label class="col-sm-4 h6 text-muted account-label">Описание проблемы</label>
                <div class="col-sm-8">
                    <label class="h5">${questionListElement.question}</label>
                </div>

                <label class="col-sm-4 h6 text-muted account-label">Ответ от поддержки:</label>
                <div class="col-sm-8">
                    <label class="h5">${responseText}</label>
                </div>
                <div class="col-sm-4 h6 text-muted account-label"><button class="btn-outline-dark btn btn-sm" id="deleteQuestion" type="button">Удалить обращение</button></div>

            </div>
            `;
            const deleteButtonEl = questionItem.querySelector('#deleteQuestion');
            const deleteButtonListener = async () => {
                for (const question of questionList) {
                    if (question.theme === questionListElement.theme && question.question === questionListElement.question && question.status === questionListElement.status){
                        user.support.splice(questionList.indexOf(question), 1);
                        let timetableUpdate = await http.timetableUpdate(user);
                        let _resultUpdateFlag = '';
                        await timetableUpdate.json().then(async (data) => {
                            _resultUpdateFlag = data;
                            await console.log(data);
                            this.renderQuestionList(user);
                        });
                    }
                }
                console.log(questionList);
            };
            deleteButtonEl.addEventListener('click', deleteButtonListener);
            innerQuestionList.appendChild(questionItem);
        }
    }
}
