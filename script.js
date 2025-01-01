let subtotal = 0;

function openTab(_, tabName) {
	var tabcontent, tablinks;

	tabcontent = document.getElementsByClassName("tabcontent");
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	tablinks = document.getElementsByClassName("tablinks");
	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	document.getElementById(tabName).style.display = "block";
	_.currentTarget.className += " active";
}

function addToCart(button) {
    let parent = button.parentNode;
    let clonedNode = parent.cloneNode(true);
    clonedNode.removeChild(clonedNode.getElementsByTagName("button")[0]);
	
	let price = clonedNode.querySelector(".item #price").innerHTML;

    let cancel = document.createElement("button");
    cancel.innerHTML = "Remove";
	cancel.onclick = function () {
		price = this.parentNode.querySelector(".item #price").innerHTML;
		this.parentNode.remove();
		adjustPrice("subtract", price.substring(1));
	};
    clonedNode.appendChild(cancel);
    
	let pricePara = document.getElementById("total");
    document.getElementById("Cart").insertBefore(clonedNode, pricePara);
	adjustPrice("add", price.substring(1))
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
