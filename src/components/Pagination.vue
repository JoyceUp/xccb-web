<template>
<ul class="pagination d-flex mb-0">
    <li class="mr-auto">
        <span class="description">当前页{{num}}/{{totalPages}} 每页{{size}}条数据 共{{totalElements}}条</span>
    </li>
    <li :class="{'disabled':num===1}" class="page-item">
        <span class="page-link" @click="changePage(num - 1)">«</span>
    </li>
    <li v-if="from !== 1" class="page-item">
        <span class="page-link" @click="changePage(1)">1</span>
    </li>
    <li v-if="from !== 1" class="page-item">
        <span class="page-link">...</span>
    </li>
    <li v-for="i in (to-from+1)" :class="{'active':num===(from + i - 1)}" class="page-item">
        <span class="page-link" @click="changePage(from + i - 1)">{{from + i - 1}}</span>
    </li>
    <li v-if="to !== totalPages" class="page-item">
        <span class="page-link">...</span>
    </li>
    <li v-if="to !== totalPages" class="page-item">
        <span class="page-link" @click="changePage(totalPages)">{{totalPages}}</span>
    </li>
    <li :class="{'disabled':num===totalPages}" class="page-item">
        <span class="page-link" @click="changePage(num + 1)">»</span>
    </li>
</ul>
</template>

<script>
export default {
    name: "Pagination",
    props: [
        'current',
        'totalPages',
        'totalElements',
        'size',
    ],
    data() {
        return {
            num: this.current
        }
    },
    computed: {
        from() {
            return this.num > 3 ? this.num - 2 : 1;
        },
        to() {
            return this.from + 4 < this.totalPages ? this.from + 4 : this.totalPages
        }
    },
    methods: {
        changePage(page) {
            if (this.num === page || page < 1 || page > this.totalPages) {
                return;
            }
            this.num = page;
            this.$emit('on-change', page);
        }
    }
}
</script>