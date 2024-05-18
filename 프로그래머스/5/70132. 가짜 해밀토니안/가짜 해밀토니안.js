var DEBUG = false;

class Node{
    v;
    edges = [];
    parent = null;
    value = 0;
    depth = 0;
    height = undefined;
    values = []
    depths = []
    constructor(v){
        this.v = v
    }
    addEdge(arg){
        this.edges.push(arg)
    }
}


class GraphTree {

    vertices = [];
    max = 0;

    addEdge(arg){
        var id1 = arg[0]
        var id2 = arg[1]
        var v1 = this.vertices[id1]
        if(!v1){
            this.vertices[id1] = v1 = new Node(id1)
        }
        var v2 = this.vertices[id2]
        if(!v2){
            this.vertices[id2] = v2 = new Node(id2)
        }
        v1.addEdge(v2)
        v2.addEdge(v1)
    }

    calcValue(root){
        var current = root;
    next:
        while(current){
            if(!current.init){
                for(var child of current.edges){
                    child.parent = current;
                    child.edges.splice(child.edges.indexOf(current), 1)
                }
                current.walkIndex = 0;
                current.init=true
            }

            var c = current.edges[current.walkIndex++];
            if(c){
                current = c
                continue next
            }

            current.values.sort((a,b)=>b-a)
            current.depths.sort((a,b)=>b-a)

            switch(current.edges.length){
                case 0:
                    current.depth = 1;
                    current.value = 1;
                    break
                case 1:
                    current.value = 1 + current.values[0];
                    break;

                default:
                    current.edges.sort((a,b)=>b.value-a.value)
                    if(current.edges[0].value == current.values[0] &&
                        current.edges[0].depth == current.depths[0]){
                        current.value = Math.max(
                            current.values[0] + current.depths[1] + 1,
                            current.values[1] + current.depths[0] + 1)
                    }else{
                        current.value = current.depths[0] + current.values[0] + 1
                    }
            }

            if(current.parent){
                current.parent.values.push(current.value)
                current.parent.depths.push(current.depth)
                current.parent.depth = Math.max(current.depth+1, current.parent.depth)
            }

            current = current.parent
        }

    }

    calcHeight(root){
        var current = root;
        current.init = false;
        var height = 1;
        var current_height = height;
    next:
        while(current){
            if(!current.init){
                for(var child of current.edges){
                    child.init = false;
                }
                current.walkIndex = 0;
                current.init=true
            }

            if(current.height === undefined){
                current.height = height;
            }else{
                height = current.height
            }

            var c = current.edges[current.walkIndex++];
            if(c){

                height++;
                if(current.edges[0] != c){
                    height = Math.max(height, current.depths[0] + 2)
                }else if(current.edges.length >=2 && current.edges[0] == c){
                    height = Math.max(height, current.depths[1] + 2)
                }

                current = c
                continue next
            }

            if(current.edges.length > 2){
                var dep0 = current.depths[0];
                var dep1 = current.depths[1];
                var dep2 = current.depths[2];
                var v0 = current.values[0];
                var v1 = current.values[1];
                var v2 = current.values[2];

                this.max = Math.max(
                    v0 + v1 + current.height,
                    v0 + v2 + dep1 + 1,
                    v0 + v1 + dep2 + 1,
                    this.max
                )

            }else if(current.edges.length == 2){
                var v0 = current.values[0];
                var v1 = current.values[1];
                this.max = Math.max(
                    v0 + v1 + current.height,
                    this.max
                )
            }

            height = current.height;
            current = current.parent
        }

    }


}

function solution(t) {

    var tree = new GraphTree
    t.forEach(t=>{
        tree.addEdge(t)
    })
    var root = tree.vertices[t[0][1]];
    tree.calcValue(root)
    tree.calcHeight(root)
    return tree.max
}