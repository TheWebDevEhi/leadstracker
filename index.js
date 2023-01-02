// Code for the Chrome Extension starts here
const inputBtn = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
let myLeads = [];
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');

// Note that the url of the page given to the extension by the chrome tab api is usually in the form below that is with the 
// tabs variable holding only an array as its value and the the array having an object as its item
// const tabs = [{
// 	url: "https://url here..."
// }];

// This function is to add the URL of the current page being visited to the array
tabBtn.addEventListener("click", function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		myLeads.push(tabs[0].url);
		let myStrLeads = JSON.stringify(myLeads);
		localStorage.setItem("myLeads", myStrLeads);
		render(myLeads)
	})
})

// Code to update list from localStorage starts here
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );
if(leadsFromLocalStorage){
	myLeads = leadsFromLocalStorage;
	render(myLeads);
}

	// This function clears out the leads array
deleteBtn.addEventListener("dblclick", function(){
	localStorage.clear();
	myLeads = [];
	render(myLeads);
	alert("Your leads have been cleared. Thank You!")
})

// THis function enables the saving of leads inputed into the input field
inputBtn.addEventListener("click", function(){
	if(inputEl.value != ""){
	myLeads.push(inputEl.value);

	// localStorage code to store begins here
		let myStrLeads = JSON.stringify(myLeads);
		localStorage.setItem("myLeads", myStrLeads);
	// localStorage code ends here

	render(myLeads);
	inputEl.value="";
	}
})

// THis function is used t render the leads in the list element
function render(leads){
	let listItems = "";
	for(i = 0; i < leads.length; i++){
			listItems += `
			<li class='fw-normal'>
				<a target='_blank'class='text-light' href='https://${leads[i]}'>
					${leads[i]}
				</a>
			</li>`;
		}
		ulEl.innerHTML = listItems;
}