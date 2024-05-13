import React, { useEffect } from 'react';
import * as BABYLON from 'babylonjs';

export default function Tred() {
    useEffect(() => {
        let canvas = document.getElementById('renderCanvas');
        let engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
        let createScene = function () {
            
            let scene = new BABYLON.Scene(engine);
            let camera = new BABYLON.ArcRotateCamera("Camera", 0, 250, 10, BABYLON.Vector3.Zero(), scene);
            let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
            let sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
            sphere.position.y = 1;
            //let ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
            // Defina os limites mínimo e máximo para o zoom da câmera
            camera.lowerRadiusLimit = 5; // Zoom mínimo permitido
            camera.upperRadiusLimit = 30; // Zoom máximo permitido
            camera.setTarget(sphere.position);
            
            camera.attachControl(canvas, false);
            scene.useRightHandedSystem = true;
           
            return scene;
        }
        let scene = createScene();
        scene.useRightHandedSystem = true;

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
