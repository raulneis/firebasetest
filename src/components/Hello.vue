<template>
    <div class="hello">
        <div>
            <button @click="click">Get!</button>
            <ul>
                <li v-for="position in positions">{{ position }}</li>
            </ul>
        </div>
        <hr>
        <div>{{ error }}</div>
    </div>
</template>

<script>

import firebase from '../services/firebase'

const getLocation = (successCb, failCb, multiple) => {
    const method = multiple ? 'watchPosition' : 'getCurrentPosition';

    navigator.geolocation[method]((position) => {
        successCb({
            datetime: Date.now(),
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, (error) => {
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
        switch (error.code) {
            case 0:
                failCb(error)
                break
            case 1:
                failCb(error)
                break
            case 2:
                failCb(error)
                break
            case 3:
                failCb(error)
                break
        }
    }, {
        // maximumAge: 5 * 60 * 1000,
        // enableHighAccuracy: true,
        timeout: 10 * 1000
    })
}

export default {
    name: 'hello',
    data () {
        return {
            error: '',
            positions: []
        }
    },
    mounted() {
        //
    },
    destroyed () {
        //
    },
    methods: {
        click() {
            this.position = '...'
            getLocation((position) => {
                this.positions.unshift(this.positions.length + ': '+ position.latitude + ', ' + position.longitude)
            }, (error) => {
                this.error = 'Error #' + error.code + ': ' + error.message
            }, true)
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
