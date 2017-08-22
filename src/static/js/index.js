
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
        },
        components:{
            'list-li':{
                props:['iname'],
                template:'<span>{{iname.name}}</span>'
            }
        }

    });
    // 组件
    // 小型vue实例，具备vue实例大部分功能-computed,methods,data
    Vue.component('list-item',{
        props:['todo'],
        template:'<div class="items" @click="change"><span style="color:red;">{{newmess}}</span>{{todo.name}}<span>---{{message}}</span></div>',
        data:function(){
            return {
                message:'note'
            }
        },
        methods:{
            change:function(){
                this.message += '1';
            }
        },
        computed:{
            'newmess':function(){
                return this.message+'2';
            }
        }
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
    // 父子组件数据双向传递规则：
    // 父组件props down数据给子组件，而子组件则event通知父组件执行其他操作，即子组件通过触发绑定在自己模板上的事件来执行绑定在事件上的父组件方法。
}
