subtotal = 0;

function addToCart(object) {
    let container = object.parentElement.parentElement.parentElement;

    let newDiv = document.createElement("div");
    newDiv.style.display = "flex";
    newDiv.style.flexDirection = "column";
    newDiv.style.height = "50px";
    newDiv.style.width = "100%";
    newDiv.style.justifyContent = "center";
    newDiv.style.border = "solid black 1px";
    
    let topRow = document.createElement("div");
    topRow.style.display = "flex";
    topRow.style.alignItems = "center";
    topRow.style.height = "25px";
    topRow.style.width = "100%";
    topRow.style.gap = "20%";

    let name = document.createElement("h6");
    name.textContent = object.parentElement.childNodes[1].textContent;
    name.style.flex = 1;
    name.style.marginRight = "10px";
    name.style.paddingLeft = "5px";

    topRow.appendChild(name);

    // Cancel button to remove items
    let cancelButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    cancelButton.className = "cancel-button";
    cancelButton.style.width ="15px";
    cancelButton.style.height = "15px";
    cancelButton.style.marginRight = "5px";
    cancelButton.onclick = function() { removeItem(this); };

    let line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line1.setAttribute("x1", 0);
    line1.setAttribute("y1", 0);
    line1.setAttribute("x2", 15);
    line1.setAttribute("y2", 15);
    line1.setAttribute("stroke", "black");
    line1.setAttribute("stroke-width", "1");
    line1.setAttribute("stroke-linecap", "round");
    cancelButton.appendChild(line1);

    let line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line2.setAttribute("x1", 15);
    line2.setAttribute("y1", 0);
    line2.setAttribute("x2", 0);
    line2.setAttribute("y2", 15);
    line2.setAttribute("stroke", "black");
    line2.setAttribute("stroke-width", "1");
    line2.setAttribute("stroke-linecap", "round");
    cancelButton.appendChild(line2);

    topRow.appendChild(cancelButton);
    
    let bottomRow = document.createElement("div");
    bottomRow.style.display = "flex"; 
    bottomRow.style.alignItems = "center";
    bottomRow.style.justifyContent = "center"; 
    bottomRow.style.height = "25px"; 
    bottomRow.style.width = "100%"; 
    let price = document.createElement("h4");
    price.textContent = object.textContent;
    bottomRow.appendChild(price);
    adjustPrice("add", price.textContent.substring(1));

    newDiv.appendChild(topRow);
    newDiv.appendChild(bottomRow);

    document.getElementsByClassName("cart-items")[0].appendChild(newDiv);
}

function removeItem(object) {
    let price = object.parentElement.parentElement.childNodes[1].textContent;
    adjustPrice("subtract", price.substring(1));
    object.parentElement.parentElement.remove();
}

function adjustPrice(action, price) {
    if (action === "add") {
		subtotal += parseFloat(price);
    } else if (action === "subtract") {
		subtotal -= parseFloat(price);
    }
    
    subtotal = parseFloat(subtotal.toFixed(2));
    let pricePara = document.getElementById("total");
    pricePara.innerHTML = "Subtotal = $" + subtotal.toFixed(2);

    let taxPara = document.getElementById("taxes");
    taxPara.innerHTML = "Tax (8.25%) = $" + (subtotal * 0.0825).toFixed(2);
    
    let finalPara = document.getElementById("final");
    finalPara.innerHTML = "Total = $" + (subtotal + (subtotal * 0.0825)).toFixed(2);
}

function toggleMenu() {
	document.getElementById("buttonRow").classList.toggle("show");
}
