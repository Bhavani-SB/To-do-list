function newElement() {
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You must write something!");
        return;
    }

    var li = document.createElement("li");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function() { toggleChecked(this); };

    var t = document.createTextNode(inputValue);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.onclick = function() { removeElement(this); };

    li.appendChild(checkbox);
    li.appendChild(t);
    li.appendChild(span);

    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";

    // Save to localStorage
    saveToLocalStorage();
}

function toggleChecked(checkbox) {
    var li = checkbox.parentElement;
    if (checkbox.checked) {
        li.classList.add("checked");
    } else {
        li.classList.remove("checked");
    }
    saveToLocalStorage();
}

function removeElement(span) {
    var li = span.parentElement;
    li.remove();
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
    localStorage.setItem('todoList', JSON.stringify(items));
}

function loadFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('todoList')) || [];
    
    // Clear existing list items
    document.getElementById("myUL").innerHTML = '';

    // Render saved items
    items.forEach(item => {
        var li = document.createElement("li");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onclick = function() { toggleChecked(this); };
        checkbox.checked = item.checked;

        var t = document.createTextNode(item.text);

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        span.onclick = function() { removeElement(this); };

        li.appendChild(checkbox);
        li.appendChild(t);
        li.appendChild(span);

        if (item.checked) {
            li.classList.add("checked");
        }

        document.getElementById("myUL").appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
