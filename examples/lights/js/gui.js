

var combo = null;

$(window).bind("load", function () {
    //LiteGUI.init({width:1000,height:500}); 
    LiteGUI.init({
        menubar: "#menu-bar"
    });

    LiteGUI.mainarea = new LiteGUI.Area("mainarea", {content_id: "canvasarea", main: true, inmediateResize: true});
    $(LiteGUI.root_container).append(LiteGUI.mainarea.root);
    //$(window).resize(function() { $(LiteGUI.mainarea).trigger("resize"); });

    //create main canvas
    //var canvas = document.createElement("canvas");
    //canvas.width = canvas.height = 100;
    //canvas.times = 0;
    //canvas.redraw = function() {
    //	canvas.width = $(canvas).parent().width();
    //	canvas.height = $(canvas).parent().height();
    //	var ctx = canvas.getContext("2d");
    //	ctx.clearRect(0,0,this.width,this.height);
    //	ctx.lineWidth = 1;
    //	ctx.strokeStyle = "#AAF";
    //	ctx.strokeRect(10.5,10.5,this.width-20,this.height-20);
    //	ctx.strokeText("Times: " + this.times,20.5,30.5);
    //	this.times += 1;
    //}
    //$(LiteGUI.mainarea.content).bind("resize",function() { canvas.redraw(); });
    //LiteGUI.mainarea.content.appendChild(canvas);
    //canvas.redraw();

    createSidePanel();

    LiteGUI.mainarea.getSection(0).split("vertical", [null, "100px"], true);
    var docked_bottom = new LiteGUI.Panel("bottom_panel", {title: 'Docked panel', hide: true});
    docked_bottom.dockTo(LiteGUI.mainarea.getSection(0).getSection(1), "full");
    docked_bottom.show();
    $(docked_bottom).trigger("closed", function () {
        LiteGUI.mainarea.getSection(0).merge()
    });
    LiteGUI.mainarea.resize();

    //var dialog = createWidgetsDialog();

    //this.mainmenu = new LiteMenubar("mainmenubar");
    //$("#menu-bar").append(this.mainmenu.root);
    LiteGUI.mainmenu.add("file/new");
    LiteGUI.mainmenu.add("file/open");
    LiteGUI.mainmenu.add("file/save");
    LiteGUI.mainmenu.add("edit/undo");
    LiteGUI.mainmenu.add("edit/redo");
    LiteGUI.mainmenu.add("edit/");
    LiteGUI.mainmenu.add("edit/copy", {callback: function () {
            trace("FOOOO");
        }});
    LiteGUI.mainmenu.add("edit/paste");
    LiteGUI.mainmenu.add("edit/clear");

    LiteGUI.mainmenu.add("view/bottom panel", {callback: function () {
            docked_bottom.show();
        }});
    LiteGUI.mainmenu.add("view/fixed size", {callback: function () {
            LiteGUI.setWindowSize(1000, 600);
        }});
    LiteGUI.mainmenu.add("view/");
    LiteGUI.mainmenu.add("view/side panel", {callback: function () {
            createSidePanel();
        }});
    LiteGUI.mainmenu.add("view/maximize", {callback: function () {
            LiteGUI.setWindowSize();
        }});

    LiteGUI.mainmenu.add("debug/dialog", {callback: function () {
            createDialog();
        }});

    LiteGUI.mainmenu.add("debug/message", {callback: function () {
            LiteGUI.showMessage("This is an example of message");
        }});

    LiteGUI.mainmenu.add("debug/modal", {callback: function () {
            var dialog = new LiteGUI.Panel("blarg", {width: 300, height: 100, close: true, content: "This is an example of modal dialog"});
            dialog.makeModal();
            dialog.addButton("Accept", {close: true});
            dialog.addButton("Cancel", {close: 'fade'});
        }});

});

function createSidePanel()
{
    LiteGUI.mainarea.split("horizontal", [null, "240px"], true);

    var docked = new LiteGUI.Panel("right_panel", {title: 'Docked panel', close: true});
    docked.dockTo(LiteGUI.mainarea.getSection(1).content, "full");
    docked.show();
    $(docked).bind("closed", function () {
        LiteGUI.mainarea.merge();
    });

    window.sidepanel = docked;

    //updateSidePanel(docked);
}

function updateSidePanel(root)
{
    root = root || window.sidepanel;
    $(root.content).empty();

    /*
     
     //tabs 
     var tabs_widget = new LiteGUI.Tabs("paneltab");
     tabs_widget.add("Info");
     tabs_widget.add("Tree",{selected:true});
     tabs_widget.add("Extra");
     
     $(tabs_widget.contents["Info"]).append("<strong>Example of code inside tab container</strong>");
     
     //tree
     var mytree = { id: "Rootnode", 
     children: [
     { id: "Child1" },
     { id: "Child2", children: [
     { id: "SubChild1" },
     { id: "SubChild2" },
     { id: "SubChild3" },
     { id: "SubChild4" }
     ]},
     { id: "Child3" },
     ]};
     
     var litetree = new LiteGUI.Tree("tree",mytree,{allow_rename:true});
     $(litetree).bind("item_selected", function(e,node) {
     trace("Node selected: " + node); 
     });
     $(tabs_widget.contents["Tree"]).append( litetree.root );
     
     litetree.insertItem( {id:"FOO"}, "Child2",21 );
     //litetree.removeItem( "SubChild1" );
     //litetree.moveItem( "FOO", "Child3" );
     litetree.insertItem( {id:"MAX"}, "Rootnode",0 );
     $(root.content).append(tabs_widget.root);
     
     */

    //side panel widget
    var widgets = new LiteGUI.Inspector();
    widgets.onchange = function (name, value, widget) {
        //trace("Widget change: " + name + " -> " + value );
    };
    $(root.content).append(widgets.root);

    window.foo = "";

    for (var i = 0; i < 5; i++)
    {
        /*
         widgets.addButton("Num." + Math.random().toFixed(4),"Save",{callback: function(name) { window.foo = Math.random(); trace("Button pressed: " + window.foo); } });
         widgets.addSeparator();
         widgets.addInfo("info","This is an example of different widgets");
         widgets.addSection("Numbers stuff");
         widgets.addNumber("number",10, {min:0, callback: function(v) { trace("number change: " + v); } });
         widgets.addSlider("slider",10,{min:1,max:100,step:1});
         */
    }

    widgets.addCombo("shader_list", "",
            {
                values: [""],
                callback: function (name) {
                    APP.changeRenderShader(name);
                }
            });
    console.log(root);

    /*
     widgets.addSlider("slider",10,{min:1,max:100,step:1});
     widgets.addSeparator();
     widgets.addVector2("vector2",[10,20], {min:0});
     widgets.addVector3("vector3",[10,20,30], {min:0});
     widgets.addSection("Text stuff");
     widgets.addString("string","foo");
     widgets.addStringButton("string button","foo", { callback_button: function(v) { trace("Button: " + v); } });
     widgets.addTextarea(null,"a really long silly text", {height: 100});
     widgets.addCombo("combo","javi",{values:["foo","faa","super largo texto que no cabe entero","javi","nada"], callback: function(name) { trace("Combo selected: " + name); }});
     widgets.addComboButtons("combobuttons","javi",{values:["foo","faa","javi","nada"], callback: function(name) { trace("Combo button selected: " + name); }});
     widgets.addTags("tags","pop",{values:["rap","blues","pop","jazz"], callback: function(tags) { trace("Tag added: " + JSON.stringify(tags) ); }});
     widgets.addSection("Other widgets");
     widgets.addCheckbox("checkbox",true,{callback: function(value) { trace("Checkbox pressed: " + value); } });
     widgets.addButton("Serialize","Save",{callback: function(name) { trace("Button pressed: " + name); } });
     widgets.addButtons("Serialize",["Save","Load","New"],{callback: function(name) { trace("Button pressed: " + name); } });
     widgets.addButton(null,"Save");
     widgets.addSeparator();
     widgets.addColor("Color",[0,1,0]);
     widgets.addFile("File","test.png");
     widgets.addLine("Line",[[0.5,1],[0.75,0.25]],{defaulty:0,width:120}); 
     */
    LiteGUI.mainarea.resize();
}

function addComboShader(value_ini,values) {

    var root = window.sidepanel;
    $(root.content).empty();
    var widgets = new LiteGUI.Inspector();
    widgets.addCombo("shader_list", value_ini,
            {
                values: values,
                callback: function (name) {
                    APP.changeRenderShader(name);
                }
            });
    $(root.content).append(widgets.root);
    
    LiteGUI.mainarea.resize();
}

function createWidgetsDialog()
{
    //test floating panel
    var name = "Dialog_" + ((Math.random() * 100) >> 0);
    var dialog = new LiteGUI.Dialog(name, {title: name, close: true, minimize: true, width: 300, height: 200, scroll: true, resizable: true, draggable: true});
    dialog.show('fade');

    //test menu in panel
    var minimenu = new LiteGUI.Menubar("minimenu");
    minimenu.add("file/new");
    minimenu.add("center", {onclick: function () {
            dialog.center();
        }});
    minimenu.attachToPanel(dialog);

    var widgets = new LiteGUI.Inspector();
    widgets.addButton("button", "Update", {callback: function () {
            updateSidePanel();
        }});
    widgets.addString("string", "foo");
    widgets.addNumber("number", 10, {min: 0});
    widgets.addTree("tree", {person: "javi", info: {age: 32, location: "barcelona"}, role: "worker"});

    widgets.addSeparator();
    widgets.addVector2("vector2", [10, 20], {min: 0});
    widgets.addVector3("vector3", [10, 20, 30], {min: 0});
    widgets.addSeparator();
    widgets.addTextarea("textarea", "a really long silly text");
    widgets.addInfo("info", "a really long silly text");
    widgets.addSlider("slider", 10, {min: 1, max: 100, step: 1});
    widgets.addCheckbox("checkbox", true);
    widgets.addCheckbox("checkbox2", false);
    widgets.addCombo("combo", "javi", {values: ["foo", "faa", "super largo texto que no cabe entero", "javi", "nada"]});
    widgets.addButtons("Serialize", ["Save", "Load", "New"]);
    widgets.addButton(null, "Save");
    $(dialog.content).append(widgets.root);

    return dialog;
}