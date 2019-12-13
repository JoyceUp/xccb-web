<template>
<button type="button" class="btn btn-gradient"
        :disabled="counting"
        @click="countDown()">
    <slot></slot>
</button>
</template>

<script>
export default {
    name: "CountDownBtn",
    props: {
        seconds: Number,
        text: String,
    },
    data() {
        return {
            originalText: null,
            counting: false,
            remaining: 0
        }
    },
    methods: {
        countDown() {
            if (this.counting) return;
            if (this.seconds <= 0) return;

            this.counting = true;
            this.remaining = this.seconds;
            this.originalText = this.$el.innerText;

            this.$el.innerText = this.text + '(' + this.remaining + 's)';
            let clock = setInterval(() => {
                this.remaining--;
                this.$el.innerText = this.text + '(' + this.remaining + 's)';

                if (this.remaining < 0) {
                    clearInterval(clock);
                    this.counting = false;
                    this.remaining = 0;
                    this.$el.innerText = this.originalText;
                }
            }, 1000)
        }
    },
    watch: {
        seconds: function () {
            this.countDown();
        }
    }
}
</script>