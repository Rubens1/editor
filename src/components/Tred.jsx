import React, { useEffect } from 'react';
import * as BABYLON from 'babylonjs';

export default function Tred() {
    useEffect(() => {
        var canvas = document.getElementById('renderCanvas');
        var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
        var createScene = function () {
            var scene = new BABYLON.Scene(engine);
            var camera = new BABYLON.ArcRotateCamera("Camera", 0, 250, 10, BABYLON.Vector3.Zero(), scene);
            var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
            var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
            sphere.position.y = 1;
            var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
            
            camera.setTarget(sphere.position);
            
            camera.attachControl(canvas, false);
            
            return scene;
        }
        var scene = createScene();
        engine.runRenderLoop(function () {
            scene.render();
        });
        window.addEventListener('resize', function () {
            engine.resize();
        });
    }, [])
    return (
        <div className='babylonjs'>
            <canvas id="renderCanvas" />
        </div>
    );
}
