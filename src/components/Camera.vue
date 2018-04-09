<template>
    <div class="hello">
        <div>
            <video id="video" style="width: 30%;" autoplay></video>
            <canvas id="canvas" style="display: none !important;"></canvas>
            <button id="button" @click="processFile">Capture</button>
        </div>
        <hr>
        <!-- <hr>
        <div>
            <input type="file"
                   @change="processFile($event)"
                   accept="image/*"
                   id="archivo"
                   capture="environment">
        </div> -->
        <div>{{ message }}</div>
        <div v-if="url"><img style="width: 100%;" :src="url" alt=""></div>
    </div>
</template>

<script>

import firebase from '../services/firebase'

function capture(captureButton, image) {
    const constraints = {
        video: true
    };

    const video = document.querySelector('video');

    const canvas = document.createElement('canvas');

    button.onclick = video.onclick = function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        // Other browsers will fall back to image/png
        img.src = canvas.toDataURL('image/webp');
    };

    function handleSuccess(stream) {
        video.srcObject = stream;
    }

    function handleError(error) {
        console.error('Reeeejected!', error);
    }

    navigator.mediaDevices
             .getUserMedia(constraints)
             .then(handleSuccess)
             .catch(handleError);
}


export default {
    name: 'hello',
    data () {
        return {
            message: '',
            url: null
        }
    },
    mounted() {
        const constraints = {
            video: true
        };

        function handleSuccess(stream) {
            video.srcObject = stream;
        }

        function handleError(error) {
            alert(error);
            console.error('Reeeejected!', error);
        }

        navigator.mediaDevices
                 .getUserMedia(constraints)
                 .then(handleSuccess)
                 .catch(handleError)
    },
    destroyed () {
        const tracks = this.mediaStream.getTracks()
        tracks.map(track => track.stop())
    },
    methods: {
        processFile() {
            let component = this
            let storageRef = this.$root.firebase.storage.ref()

            let name = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 8)
            let ref = storageRef.child('fotos/' + name + '.jpg')

            const video = document.querySelector('video')
            const canvas = document.querySelector('canvas')

            this.url = null

            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            canvas.getContext('2d').drawImage(video, 0, 0)

            console.log('pre blob')
            canvas.toBlob(function(blob) {
                console.log('soy blob')
                var image = new Image()
                image.src = blob
                var uploadTask = ref.put(blob)

                uploadTask.on('state_changed', function(snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    component.message = 'Upload is ' + progress.toFixed(2) + '% done'
                    switch (snapshot.state) {
                        case 'paused':
                            component.message += ' - Upload is paused'
                            break
                        case 'running':
                            component.message += ' - Upload is running'
                            break
                    }
                }, function(error) {
                    component.message = 'ERROR: ' + JSON.stringify(error)
                }, function() {
                    component.message = ''
                    component.url = uploadTask.snapshot.downloadURL
                })
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
