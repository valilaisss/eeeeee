let controls;
function changeZoom() {
    controls.enableZoom = true;
    controls.enableDamping = true;
    }
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('model-container');
        let zoomable = false;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xC9C9C9);
        
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(3, 2, 5);
        
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0xC9C9C9);
        container.appendChild(renderer.domElement);
        
        // Освещение
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
        backLight.position.set(-2, 1, -3);
        scene.add(backLight);
        
        // Управление
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enableDamping = false;
    
        // Загрузка модели (без тестового куба)
        const loader = new THREE.GLTFLoader();
        loader.load('assets/model-of-bed2.glb',
            (gltf) => {
                console.log('Модель загружена!');
                gltf.scene.rotation.y = Math.PI;
                scene.add(gltf.scene);
                
                // Центрируем камеру на модель
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const distance = maxDim * 1.5;
                
                camera.position.set(distance, distance * 0.5, distance);
                camera.lookAt(center);
                controls.target.copy(center);
                controls.update();
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% загружено');
            },
            (error) => {
                console.error('Ошибка загрузки модели:', error);
            }
        );
        
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
        
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    });