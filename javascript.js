document.addEventListener('DOMContentLoaded', () => {
    // Load from localStorage when the page loads
    loadFromLocalStorage();
});

function newElement() {
    const inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You must write something!");
        return;
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function() { toggleChecked(this); };

    const textNode = document.createTextNode(inputValue);

    const span = document.createElement("SPAN");
    const closeText = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(closeText);
    span.onclick = function() { removeElement(this); };

    li.appendChild(checkbox);
    li.appendChild(textNode);
    li.appendChild(span);

    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";

    // Save the new list to localStorage
    saveToLocalStorage();
}

function toggleChecked(checkbox) {
    const li = checkbox.parentElement;
    if (checkbox.checked) {
        li.classList.add("checked");
    } else {
        li.classList.remove("checked");
    }
    // Save changes to localStorage when items are checked/unchecked
    saveToLocalStorage();
}

function removeElement(span) {
    const li = span.parentElement;
    li.remove();
    // Save changes to localStorage after removing an item
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const items = [];
    document.querySelectorAll('#myUL li').forEach(li => {
        items.push({
            text: li.childNodes[1].textContent,
            checked: li.querySelector('input[type="checkbox"]').checked
        });
    });
    // Save the current list to localStorage as a string
    localStorage.setItem('todoList', JSON.stringify(items));
}

function loadFromLocalStorage() {
    const savedList = JSON.parse(localStorage.getItem('todoList')) || [];

    if (savedList.length > 0) {
        document.getElementById("myUL").innerHTML = '';  // Clear the current list before loading
        savedList.forEach(item => {
            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.onclick = function() { toggleChecked(this); };
            checkbox.checked = item.checked;

            const textNode = document.createTextNode(item.text);

            const span = document.createElement("SPAN");
            const closeText = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(closeText);
            span.onclick = function() { removeElement(this); };

            li.appendChild(checkbox);
            li.appendChild(textNode);
            li.appendChild(span);

            if (item.checked) {
                li.classList.add("checked");
            }

            document.getElementById("myUL").appendChild(li);
        });
    }
}
