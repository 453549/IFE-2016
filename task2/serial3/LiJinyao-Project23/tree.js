//初始化一个二叉树并绑定事件
function initTree(data){

    var rootView = document.getElementById('root');
    rootView.innerHTML = '';
    renderTree(data,rootView);
    var preAnimate;

    //当树渲染完成后再绑定遍历按钮的事件。
    addClickEvent($('preorderTraversal'), function () {
        cleanAnimation(preAnimate);
        preAnimate = animateTraverse(traversal.preorderTraversal(root));
    });

    addClickEvent($('inorderTraversal'), function () {
        cleanAnimation(preAnimate);
        preAnimate = animateTraverse(traversal.inorderTraversal(root));
    });

    addClickEvent($('postorderTraversal'), function () {
        cleanAnimation(preAnimate);
        preAnimate = animateTraverse(traversal.postorderTraversal(root));
    });
}

var $ = function (element) {
    return document.getElementById(element);
};

function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event, listener);
    }else{
        element['on' + event] = listener;
    }
}

function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

//清除动画
function cleanAnimation(preAnimate) {
    clearInterval(preAnimate);
    var focus = document.getElementById('focus');
    if(focus){
        focus.id = '';
    }
}

//将json渲染到网页
function renderTree(data, parentElement){
    // var data = {
    //     'root': {
    //         'a': {
    //             'a1': 'a1',
    //             'a2': 'a2'
    //         },
    //         'b': {
    //             'b1': {
    //                 'b1.1': 'b1.1',
    //                 'b1.2': 'b1.2',
    //                 'b1.3': 'b1.3'
    //             },
    //             'b2': {
    //                 'b2.1': 'b2.1'
    //             }
    //         }
    //     }
    // };
    var key;
    var treeView;
    for(key in data){
        if(key != 'view'){
            treeView = document.createElement('div');
            treeView.className='child';
            treeView.innerHTML = key;
            parentElement.appendChild(treeView);
            data[key].view = treeView;
            renderTree(data[key], treeView);
        }

    }

}

//生成二叉树先序遍历序列
var traversal = {
    inorderTraversal: function inorderTraversal(root){
        var traverseQueue = [];
        function genTraverseQueue(root) {
            if(root != null){
                genTraverseQueue(root.left);
                traverseQueue.push(root);
                genTraverseQueue(root.right);
            }
        }
        genTraverseQueue(root);
        return traverseQueue;
    },

    postorderTraversal: function postorderTraversal(root){
        var traverseQueue = [];
        function genTraverseQueue(root) {
            if(root != null){
                genTraverseQueue(root.left);
                genTraverseQueue(root.right);
                traverseQueue.push(root);
            }
        }
        genTraverseQueue(root);
        return traverseQueue;
    }
};


//动画显示二叉树遍历序列
function animateTraverse(traverseQueue){
    var start = 0;
    var time;
    var end = traverseQueue.length;
    var preNode = null;

    time = setInterval(function () {
        if(preNode != null){
            preNode.id = '';
            //preNode.classList.remove('focus');
        }
        if(start < end){
            //traverseQueue[start].view.classList.add('focus');
            traverseQueue[start].view.id='focus';
            preNode =traverseQueue[start].view;
            start++;
        }else{
            clearInterval(time);
            console.log('animate done');
        }
    }, 500);
    return time;
}

function init() {
    var data = {
        'root': {
            'a': {
                'a1': {},
                'a2': {}
            },
            'b': {
                'b1': {
                    'b1.1': {},
                    'b1.2': {},
                    'b1.3': {}
                },
                'b2': {
                    'b2.1': {}
                }
            }
        }
    };
    initTree(data);
}

init();
