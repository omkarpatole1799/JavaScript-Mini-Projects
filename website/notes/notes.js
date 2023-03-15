// css styles
// these styles are set directly inline
// element.style.backgroundColor = '#453d24'
// .getComputedStyle(element).propertyName
// element.getComputedStyle(element).color
// .setProperty('property1','property2')

// attributes
/*
.src
.alt

.getattributes('attributeName')
.setAttribute('attbuteName1','attributeName2')

// data attributes
.dataset.attributeName

*/

// classes
/*
.classList.add()
.classList.remove()
.classList.toggle()
.classList.contains()

*/


/////////////////////////////////
// types of event and handlers
/*
to add event
.addEventListener('click',function(e){
// code here
})

to remove the event
.removeEventListener('eventName',function(){})

- we can also use setTimeout function to remove event after specific internal of time

/// bubbling ////////
1. capturing phase
= when event happens it goes to the target where the event is happened
= it goes to target phase
2. target phase
= here is event is happened
3. event
= it goes again back to capturing phase

- this phenomenon called as bubbling

/// event propogation ///
e.stopPropogation() = to stop the propogation of the event
*/

