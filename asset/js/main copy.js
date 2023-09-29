//read
const rootElement = document.getElementById("root");

//fetch api
const dataapi = async () => {
    const response = await fetch("http://localhost:8000/blogs");
    const data = await response.json();
    return data;
}

//render item
const data = async () => {
    let data = await dataapi();
    const html = data.map((item) => (
        `<tr class="border">
            <th class="border" scope="row">${item.id}</th>
            <td class="border"><a data-bs-toggle="modal" data-bs-target="#modal" href="#"  onclick="onDetail(${item.id})">${item.title}</a></td>
            <td class="border">${item.author}</td>
            <td class="border">
                <button data-bs-toggle="modal" data-bs-target="#modal" onclick="onEdit(${item.id})" class="btn btn-success">Edit</button>
                <button data-bs-toggle="modal" data-bs-target="#modal" onclick="onDelete(${item.id})" class="btn btn-danger">Delete</button>
            </td>
        </tr>`
    )).join("");
    return html;
}

const render = async () => {
    let html = await data();
    let htmls = `
        <table class="table border">
            <thead>
                <tr class="border">
                    <th class="border col" scope="col">#</th>
                    <th class="border" scope="col">title</th>
                    <th class="border col-2" scope="col">author</th>
                    <th class="border col-2" scope="col">action</th>
                </tr>
            </thead>
            <tbody>
                ${html}
            </tbody>
        </table>
    `;
    rootElement.innerHTML = htmls;
};
  
render();

//detail
const detailElement = document.getElementById("Detail-content");

//fetch api
const dataDetail = async (id) => {
    const response = await fetch(`http://localhost:8000/blogs/${id}`);
    const data = await response.json();
    return data;
}

const onDetail = async (id) => {
    let blog = await dataDetail(id);
    let html = 
        `<div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Detail Blog</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">author</label>
                    <input disabled type="text" value="${blog.author}" name="author" class="form-control" id="exampleFormControlInput1">
                </div>
                <div class="mb-3">
                    <label class="form-label">title</label>
                    <input disabled type="text"  value="${blog.title}" name="title" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock">
                </div>
                <div class="mb-3">
                <label class="form-label">content</label>
                <textarea disabled class="form-control" name="content" id="exampleFormControlTextarea1" rows="3">${blog.content}</textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>`
    detailElement.innerHTML = html;
}


//edit
const editElement = document.getElementById("edit-content");

//fetch api
const dataEdit = async (id) => {
    const response = await fetch(`http://localhost:8000/blogs/${id}`);
    const data = await response.json();
    return data;
}

const onEdit = async (id) => {
    let blog = await dataDetail(id);
    let html = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Blog</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form method="post" action="http://localhost:8000/blogs/${blog.author}">
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">author</label>
                        <input id="update-author" type="text" name="author" value="${blog.author}" class="form-control" id="exampleFormControlInput1">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">title</label>
                        <input id="update-title" type="text" name="title" value="${blog.title}" class="form-control" aria-describedby="passwordHelpBlock">
                    </div>
                    <div class="mb-3">
                    <label class="form-label">content</label>
                    <textarea class="form-control" name="content" id="update-content" rows="3">${blog.content}</textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary onclick="onUpdate(${blog.id})"">Save</button>
                </div>
            </form>
        </div>`
    console.log(html)
    editElement.innerHTML = html;
}

const onUpdate = () => {
    let inputAuthor = document.getElementById("update-author");
    let valueAuthor = inputAuthor.value;
    let inputTitle = document.getElementById("update-title");
    let valueTitle = inputTitle.value;
    let inputContent = document.getElementById("update-content");
    let valueContent = inputContent.value;
    // console.log(inputAuthor + inputContent + inputTitle);
    const data = {
        author: valueAuthor,
        title: valueTitle,
        content: valueContent
    };  
    const jsonData = JSON.stringify(data);   
    fetch(`http://localhost:8000/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: jsonData
    })
}



//delete
const deleteElement = document.getElementById("delete-content");

//fetch api
const dataDelete = async (id) => {
    const response = await fetch(`http://localhost:8000/blogs/${id}`);
    const data = await response.json();
    return data;
}

const onDelete = async (id) => {
    let blog = await dataDetail(id);
    let html = `
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Blog</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label class="form-label">author</label>
                <input id="update-author" type="text" name="author" value="${blog.author}" class="form-control" id="exampleFormControlInput1">
            </div>
            <div class="mb-3">
                <label class="form-label">title</label>
                <input id="update-title" type="text" name="title" value="${blog.title}" class="form-control" aria-describedby="passwordHelpBlock">
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" onclick="deleteYes(${blog.id})">Delete</button>
        </div>
    </div>`;
    console.log(html)
    deleteElement.innerHTML = html;
}

const deleteYes = (id) => {
    fetch(`http://localhost:8000/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
    });
}


