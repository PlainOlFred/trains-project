$(document).ready(function(){

    
    const addTrainForm =$('form');
    let trainRef = firebase.database().ref('trains/')

    //Create schedule
    function Sched(start, freq){
        this.start = start;
        this.freq = freq;
       
        let schedArray = new Array(Math.floor(1440/freq)).fill(start)
        const iterator = schedArray.keys();

        for (let keys of iterator) {
            
            console.log(Number.parseInt(keys)*Number.parseInt(freq)+Number.parseInt(start)); // expected output: "a" "b" "c"
          }
        this.sched = {
            ...schedArray
        };  
    }

    
    // Add train
    $('#add-train-form').on('submit',function(e){
        e.preventDefault();
       

        let name = addTrainForm[0][0].value
         console.log(name)
        let dest  = addTrainForm[0][1].value
        let start = addTrainForm[0][2].value
        let freq = addTrainForm[0][3].value
        let sched = new Sched(start, freq)
        

        trainRef.child(name).set({
            name,
            dest,
            start,
            freq,
            sched
        })

        

        addTrainForm.each(function(){
            this.reset()
        })

        
    })
    //Populate table
    trainRef.on('child_added',function(snapshot){
        let snap = snapshot.val()
            let name = snap['name'];
            let dest = snap['dest'];
            let start = snap['start'];//need for calculation
            let freq = snap['freq'];//interval for calculatin   

            let tableRow = $('<tr>');
            let nameData = $('<td>').text(name);
            let destData = $('<td>').text(dest);
            let freqData = $('<td>').text(freq);
            let nextArrival = $('<td>')
                .attr({
                    class: 'next-arrival-text'
                }).text('4pm'/*caluation */);
            let timeLeft = $('<td>')
                .attr({
                    class: 'time-left-text'
                }).text('5min'/*calculation*/);
            let removeBtn =$('<button>X</button>')
    
            tableRow.append(nameData, destData, freqData, nextArrival, timeLeft, removeBtn);

            $('#train-data-table').append(tableRow)
    })

    //Calculation
    function calArrival(){
        let nextArrivalText = $('.next-arrvial-text')
        let timeLeftText = $('.time-left-text');
        
        /**Givens: start freg*/
        let nextArrival = function(start, freq){
            
        }
     


    }

    

    
    console.log(moment().format('LTS'));
})