$(document).ready(function(){

    const trainRef =firebase.database().ref('trains/')
    const addTrainForm =$('form');

    
    // Add train
    $('#add-train-form').on('submit',function(e){
        e.preventDefault();

        let name = addTrainForm[0][0].value
        let dest  = addTrainForm[0][1].value
        let start = addTrainForm[0][2].value
        let freq = addTrainForm[0][3].value

        trainRef.child(name).set({
            name,
            dest,
            start,
            freq
        })

        addTrainForm.each(function(){
            this.reset()
        })
    })
    //Populate table
    trainRef.on('child_added',function(snapshot){
        let snap = snapshot.val()
        // snapshot.forEach(function(){
            let name = snap['name'];
            let dest = snap['dest'];
            let start = snap['start'];//need for calculation
            let freq = snap['freq'];//interval for calculatin   

            let tableRow = $('<tr>');
            let nameData = $('<td>').text(name);
            let destData = $('<td>').text(dest);
            let freqData = $('<td>').text(freq);
            let nextArrival = $('<td>').text('4pm'/*caluation */);
            let timeLeft = $('<td>')
                .attr({
                    class: 'time-left-text'
                }).text('5min'/*calculation*/);
            let removeBtn =$('<button>X</button>')
    
            tableRow.append(nameData, destData, freqData, nextArrival, timeLeft, removeBtn);

            $('#train-data-table').append(tableRow)
        // })
    })

    //Calculation
    function calArrival(){
        let timeLeftText = $('.time-left-text');


    }
    console.log(moment().format('LTS'));
})