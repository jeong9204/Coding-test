let M = 1000000007n
let matmul = (a,b) => {
    let n = a.length
    let c = []
    for(let i=0;i<n;++i){
        c.push(Array(n).fill(0n))
        for(let j=0;j<n;++j)
            for(let k=0;k<n;++k)
                c[i][j] = (c[i][j]+a[i][k]*b[k][j])%M
    }
    return c
}
let matpow = (a,n) => {
    if(n==1) return a
    let h = matpow(a,n/2|0)
    let r = matmul(h,h)
    return n&1? matmul(r,a):r
}
function solution(g, d, k) {
    let [h,w] = [g.length,g[0].length]
    let a = []
    for(let r of g) a.push(...r)
    let hw = h*w
    let m = c => {
        c = BigInt(c)
        let r = []
        for(let i=0;i<hw;++i){
            r.push(Array(hw).fill(0n))
            if(i<hw-w && a[i+w]-a[i]==c) ++r[i][i+w]
            if(i>=w && a[i-w]-a[i]==c) ++r[i][i-w]
            if(i%w && a[i-1]-a[i]==c) ++r[i][i-1]
            if(i%w<w-1 && a[i+1]-a[i]==c) ++r[i][i+1]
        }
        return r
    }
    let b = m(d[0])
    for(let i=1;i<d.length;++i) b = matmul(b,m(d[i]))
    b = matpow(b,k)
    let s = r => r.reduce((z,x) => (z+x)%M,0n)
    return s(b.map(s))
}