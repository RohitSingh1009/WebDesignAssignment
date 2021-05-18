/**
* Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/
class Node {

  constructor(tag, children, classes,id) {
    // Tag name of the node.
    this.tag = tag;
    // Array of CSS class names (string) on this element.
    this.classes = classes;
    // Array of children nodes.
    this.children = children; // All children are of type Node
    this.id=id;
  }
  depthfirstsearch(selector,parentnode,result,isclass){
      for(let i=0;i<parentnode.children.length;i++){ //Iterating through the children tags
          if(isclass && parentnode.children[i].classes.includes(selector)) { //check both boolean isclass for children and if the class has the selector.
              //result.push(parentnode.children[i].id);
              result.push(parentnode.children[i]); //This part is just to push the children node
              }
          else if( selector==parentnode.children[i].tag){// To check if the children node has the selector tag and push the parent node
              // result.push(parentnode.children[i].id);
              result.push(parentnode.children[i]);
          }   
          if(parentnode.children.length){ //To check if the parent node has children
              result=this.depthfirstsearch(selector,parentnode.children[i],result,isclass) //Recursively calling the function 
              }
          }
          return result;
      }

  /**
  * Returns descendent nodes matching the selector. Selector can be 
  * a tag name or a CSS class name.
  * 
  * For example: 
  * 
  * 1.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `span` should return 3 span nodes in this order
  * span-1 -> span-2 -> span-3.
  *
  * 2.
  * <div> 
  *   <span id="span-1" class="note"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `.note` should return one span node with `note` class.
  * 
  * @param {string} the selector string.
  * @returns {Array} Array of descendent nodes.
  * @public
  */
  search(selector) {
    try{
      let isclass=selector[0]==".";  //To check if the selector first character has . if it consists of . it is a class
      let result=[];
      selector=isclass ? selector.substring(1,selector.length):selector; //if the selector is class removing the . 
      return this.depthfirstsearch(selector,this,result,isclass); // helper class is called for pushing the children nodes 
    }
    catch{
        if(selector==null) return "Invalid Input"
        if(typeof(selector!=String)) return "Not a String input"
    }
  }
}

// search(selector) {
//   let isclass=selector[0]==".";  //To check if the selector first character has . if it consists of . it is a class
//       let result=[];
//       selector=isclass ? selector.substring(1,selector.length):selector; //if the selector is class removing the . 
//       // if(isclass && this.classes.includes(selector)) {//check both boolean isclass and if the class has the selector.
//       //     //result.push(parentnode.children[i].id);
//       //     result.push(this); //This part is just to push the parent node before recursion
//       //     }
//       // else if( selector==this.tag){ // To check if the root node has the selector tag and push the parent node
//       //     // result.push(parentnode.children[i].id);
//       //     result.push(this);
//       // }
//       return this.depthfirstsearch(selector,this,result,isclass); // helper class is called for pushing the children nodes 
// }



/* DOM -
<body id="content">
<div id="div-1" class="mainContainer">
    <span id="span-1" class="note"></span>
    <span id="span-2"></span>
    <div id="div-2" class="subContainer1">
        <p id="para-1" class="sub1-p1 note"></p>
        <span id="span-3" class="sub1-span3"></span>
    </div>
    <div id="div-3" class="subContainer2">
        <section id="sec-1">
            <label id="lbl-1"></label>
        </section>
    </div>
    <div id="div-4">
        <span id="span-4" class="mania"></span>
        <span id="span-5" class="note mania"></span>
    </div>
</div>
<span id="span-6" class="randomSpan"></span>
</body>
*/
let randomNode=new Node('span',[],['randomSpan'],'span-6');
let spanNode5=new Node('span',[],['note','mania'],'span-5');
let spanNode4=new Node('span',[],['mania'],'span-4');
let divNode4=new Node('div',[spanNode4,spanNode5],[],'div-4');
let labelNode=new Node('label',[],[],'lbl-1')
let sectionNode=new Node('section',[labelNode],[],'section1');
let divNode3= new Node('div',[sectionNode],['subContainer2'],'div-3');
let spanNode3=new Node('span',[],['sub1-span3'],'span-3');
let p1=new Node('p',[],['sub-p1','note'],'para-1')
let divNode2=new Node('div',[p1,spanNode3],['subContainer1'],'div-2');
let spanNode2=new Node('span',[],[],'span-2');
let spanNode1 =new Node('span',[],['note'],'span-1');
let divNode1=new Node ('div',[spanNode1,spanNode2,divNode2,divNode3,divNode4],['mainContainer'],'div-1');
let body=new Node('body',[divNode1,randomNode],[],'content');

console.log("started");
console.log(divNode1.search("span"));
console.log(divNode1.search(".note"));
console.log(divNode1.search("label"));
console.log(p1.search(".note"));
console.log(divNode1.search("div"));
console.log(randomNode.search("div"));
console.log(divNode2.search("section"));
console.log(body.search());
console.log(body.search("section"));
console.log(divNode1.search(".randomSpan"));