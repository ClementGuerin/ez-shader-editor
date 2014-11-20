function CanvasController() {
    this._camera_controller = new CameraController(App.camera, {rotation_speed: 5});
    this._node_controller = new NodeController(null, {rotation_speed: 10});
    this._controller = null;
}

CanvasController.prototype.onMouseEvent = function (e) {

        var obj = this.getNodeOnMouse(e.canvasx, gl.canvas.height - e.canvasy); // the y coordinates start from the bottom in the event

        if(e.eventType != "mousemove"){
            if (obj) {
                e.obj = obj;
                this._controller  = this._node_controller;
            } else {
                this._controller  = this._camera_controller;
            }
        }

        if (e.eventType == "mousewheel") {
            this._camera_controller.handleMouseWheel(e);
        }
        if (e.eventType == "mousemove" && e.dragging) {
            this._controller .handleMouseMove(e);
        }
        if(e.eventType == "mousedown"){
            this._controller .handleMouseDown(e);
        }

}

CanvasController.prototype.getNodeOnMouse = function (canvas_x, canvas_y) {

    var nodes = App.scene.root.getAllChildren();
    var RT = new GL.Raytracer(App.camera._view_matrix, App.camera._projection_matrix);
    var ray = RT.getRayForPixel(canvas_x, canvas_y);

    var closest_node = null;
    var closest_t = 100000000;

    for (var i in nodes) {
        var node = nodes[i];
        var mesh = gl.meshes[node.mesh];
        if (mesh.bounding) {
            var result = Raytracer.hitTestBox(App.camera._position, ray, BBox.getMin(mesh.bounding), BBox.getMax(mesh.bounding), node._local_matrix);
            if (result && closest_t > result.t) {
                closest_node = node;
                closest_t = result.t;
            }
        }
    }
    return closest_node;
}

CanvasController.prototype.getSelectedNode = function()  {
    return this._node_controller._obj;
}
