$(document).ready(function(){

    const trainRef =firebase.database().ref('trains/')
    const addTrainForm =$('form');

    // function trainListing(name, dest, start, next){
    //     let tableRow = $('<tr>');
    //     let nameData = $('<td>').text(name);
    //     let destData = $('<td>').text(dest);
    //     let startData = $('<td>').text(start);
    //     let nextData = $('<td>').text(next);

    //     tableRow.append(nameData, destData, startData, nextData);
    //     return tableRow;
    // }
    
    $('#add-train-form').on('submit',function(e){
        e.preventDefault();

        let name = addTrainForm[0][0].value
        let dest  = addTrainForm[0][1].value
        let start = addTrainForm[0][2].value
        let next = addTrainForm[0][3].value

        trainRef.child(name).set({
            name,
            dest,
            start,
            next
        })

        addTrainForm.each(function(){
            this.reset()
        })
    })

    trainRef.on('child_added',function(snapshot){
        let snap = snapshot.val()
        snapshot.forEach(function(){
            let name = snap['name'];
            let dest = snap['name'];
            let start = snap['start'];
            let next = snap['next'];

            let tableRow = $('<tr>');
            let nameData = $('<td>').text(name);
            let destData = $('<td>').text(dest);
            let startData = $('<td>').text(start);
            let nextData = $('<td>').text(next);

            tableRow.append(nameData, destData, startData, nextData);

            $('#train-data-table').append(tableRow)
        })
    })
})