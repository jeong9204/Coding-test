function solution(cap, n, deliveries, pickups) {
    let ans = 0 
    
    while(deliveries.length || pickups.length){
        while(deliveries.length && !deliveries[deliveries.length-1]){deliveries.pop()}
        while(pickups.length && !pickups[pickups.length-1]){pickups.pop()}

       ans += 2*Math.max(deliveries.length , pickups.length)

        let deliveryTarget = 0
        while(deliveries.length){
           const lastDelivery = deliveries.pop()

           if(deliveryTarget+lastDelivery <= cap){
               deliveryTarget+=lastDelivery
           }else{
               deliveries.push(deliveryTarget+lastDelivery-cap)
               break
           }
       }
        let pickupTarget = 0
        while(pickups.length){
           const lastPickup = pickups.pop()

           if(pickupTarget+lastPickup <= cap){
               pickupTarget+=lastPickup
           }else{
               pickups.push(pickupTarget+lastPickup-cap)
               break
           }
        }
    }   
    return ans;
}