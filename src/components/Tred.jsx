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
            let ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
            // Defina os limites mínimo e máximo para o zoom da câmera
            camera.lowerRadiusLimit = 10; // Zoom mínimo permitido
            camera.upperRadiusLimit = 30; // Zoom máximo permitido
            camera.setTarget(sphere.position);
          
            camera.attachControl(canvas, false);
            scene.useRightHandedSystem = true;
            
            BABYLON.SceneLoader.Append("caneca/", "caneca.gltf", scene, function (scene) {
                // Callback para ser executado após o carregamento do arquivo GLTF

                // Você pode acessar o mesh carregado e seus recursos, como o arquivo binário (.bin)
                scene.meshes.forEach(mesh => {
                    // Verifica se o mesh tem uma geometria associada (isso indicaria a presença do binário)
                    if (mesh.geometry) {
                        // Se a geometria tiver um arquivo binário associado, ele pode ser acessado aqui
                        console.log(mesh.geometry);
                    }
                });
                
            });

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
    }, []);
    
    return (
        <div className='babylonjs'>
            <canvas id="renderCanvas" />
        </div>
    );
}
