const actionBar = document.querySelector("div.action-bar")
const btAdd = actionBar.querySelector(".bt-add")
const btSearch = actionBar.querySelector(".bt-search")
const container = document.querySelector(".container-data")
const templateModalSearching = container.querySelector("template.searching")
const templateModalAluno = container.querySelector("template.aluno")

btAdd.addEventListener("click", () => {
    const cloneModal = templateModalAluno.content.cloneNode(true)
    container.prepend(cloneModal)
})

btSearch.addEventListener("click", () => {
    const cloneModal = templateModalSearching.content.cloneNode(true)
    container.prepend(cloneModal)
})

container.addEventListener("click", ev => {
    const btClose = ev.target.closest(".bt-close")
    const btSave = ev.target.closest(".bt-save")
    const btSearching = ev.target.closest(".bt-searching")
    if (btClose || btSave) {
        const modal = ev.target.closest(".modal")
        modal.remove()
    }
    if(btSearching){
        const modSearch = ev.target.closest(".mod-search")
        modSearch.remove()
    }
})