
window.onload = function(){

    var vm = new Vue({
        el:"#content",
        data:{
            content:'str content',
            seen:true,
            list:[
                {name:'hello1'},
                {name:'hello2'},
                {name:'hello3'}
            ]
        },
        methods:{
            'changeContent':function() {
                var d = new Date().getTime();
                this.content = 'change content'+d;
            }
        },
        filters:{
            'reverseMess':function(value) {
                if(!value) return '';
                return value.split('').reverse().join('');

            }
        },
        // 计算属性
        computed:{ //有缓存，响应式依赖变化了才变化
            'capContent':function() {
                var f = this.content.charAt(0).toUpperCase();
                return f+this.content.substring(1);
            },
            'nowt':function(){
                return new Date().getTime();
            }
        }

    });
    // 组件
    Vue.component('list-item',{
        props:['todo'],
        template:'<div class="items">{{todo.name}}</div>'
    });
    var list = new Vue({
        el:"#list",
        data:{
            listdatas:[
                {name:'mz001'},
                {name:'mz002'},
                {name:'mz003'}
            ]
        }
    });
}
