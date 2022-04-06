'use strict'
const firstName = document.getElementById('name');
const lastName = document.getElementById('lname');
const phoneNum = document.getElementById('phone');
const userEmail = document.getElementById('email');
const submitBtn = document.getElementById('submit-btn')
const editBtn = document.getElementById('ed-btn')
const form = document.getElementById("form");
form.addEventListener("submit", e => {
    e.preventDefault()
})
// complete user definition and inner functions
const users = {
    key: "list",
    counter: 0,
    idGen(){
    return this.counter++
    },
    member : [],
    addUser(fName, lName, email, phone) {
        this.member.push({
            id: this.idGen(),
            fName,
            lName,
            email,
            phone
        })
    this.save()},
    deleteUser(id) {
    let accept = confirm("Are you sure to delete this user?")
    if(accept === true){
    this.member = this.member.filter((member) => member.id !== id);
    this.print();
    this.save();
    }
    },
    editUser(id) {
    const indx = this.member.findIndex((member) => member.id === id)
    firstName.value = this.member[indx].fName
    lastName.value = this.member[indx].lName
    userEmail.value = this.member[indx].email
    phoneNum.value = this.member[indx].phone

    editBtn.onclick = () => {
        this.member[indx].fName = firstName.value;
        this.member[indx].lName = lastName.value;
        this.member[indx].email = userEmail.value;
        this.member[indx].phone = phoneNum.value;
        this.print();
        editBtn.style.display = "none";
        submitBtn.style.display = "block";
        firstName.value = "";
        lastName.value = "";
        userEmail.value = "";
        phoneNum.value = "";
        this.save();
        }
    },
    print() {
        const table = document.getElementById("table");
        table.innerHTML = "";
        table.innerHTML = "<tr><th>حذف</th><th>ویرایش</th><th>#</th><th>نام</th><th>نام خانوادگی</th><th>ایمیل</th><th>تلفن</th></tr>";
        this.member.forEach(member => {

            const delButton = document.createElement("button");
            delButton.innerHTML = `X`;
            delButton.className = "del"
            const edButton = document.createElement("button");
            edButton.innerHTML = `✎`;
            edButton.className= "edit"

            const row = table.insertRow();
            const deleteCell = row.insertCell(0);
            const editCell = row.insertCell(1);
            const idCell = row.insertCell(2);
            const fNameCell = row.insertCell(3);
            const lNameCell = row.insertCell(4);
            const emailCell = row.insertCell(5);
            const phoneCell = row.insertCell(6);

            deleteCell.appendChild(delButton);
            editCell.appendChild(edButton);
            idCell.innerHTML = member.id;
            fNameCell.innerHTML = member.fName;
            lNameCell.innerHTML = member.lName;
            emailCell.innerHTML = member.email;
            phoneCell.innerHTML = member.phone;

            delButton.onclick = () => {
                users.deleteUser(member.id);
            }
            edButton.onclick = () => {
                editBtn.style.display = "block";
                submitBtn.style.display = "none";
                users.editUser(member.id);
            }
        });
        firstName.value = "";
        lastName.value = "";
        userEmail.value = "";
        phoneNum.value = "";
    },
    save(){
        localStorage.setItem(this.key, JSON.stringify(this));},
    load(){
        let data = localStorage.getItem(this.key);
        if (data) {
          data = JSON.parse(data);
          this.counter = data.counter;
          this.member = data.member;}
          this.save();
          this.print();
    },
}

function submit() {
    const fName = firstName.value;
    const lName = lastName.value;
    const phone = phoneNum.value;
    const email = userEmail.value;
    users.addUser(fName, lName, email, phone);
    users.print();
}
submitBtn.addEventListener('click' , submit)
users.load();