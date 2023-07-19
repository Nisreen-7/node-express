use('mflix');
db.movies.find().sort({'imdb.rating':'desc'});
//1. Afficher les films dont le imdb rating est supérieur ou égal à 8.5
db.movies.find({'imdb.rating':{$gte:8.5}});


// 2.Afficher les films réalisés par Sofia Coppola
use('mflix');
db.movies.find({directors:'Sofia Coppola'});

// 3.Afficher les films qui ont dans leur cast Brendan Fraser
use('mflix');
db.movies.find({cast:'Brendan Fraser'},{title:true});

//4. Afficher les films qui ont le français comme langue et qui sont sortie avant l'année 2000
use('mflix');
db.movies.find({languages:'French', year:{$lt:2000}});

// 5.Afficher les films dont les genres contiennent et Sci-Fi et Action
use('mflix');
db.movies.find({genres:{$all:['Sci-Fi','Action']}});
use('mflix');
db.movies.find({$and : [{genres:'Sci-Fi'},{genres:'Action'}]});


// 6.Afficher les films dont le titre ou le plot contient le mot "moon"
use('mflix');
db.movies.find({$or: [{title:{$regex:'moon'}},{plot:{$regex:'moon'}}]})

// 7.Afficher les films de plus de 2H en Russian, afin de passer une bonne soirée
use('mflix');
db.movies.find({languages:['Russian'],runtime:{$gt:120}})


// 8.Afficher les films avec plus de 1 directors (j'ai du cherché sur google pour trouver comment faire)
use('mflix');
db.movies.find({'directors.1':{$exists:true}})




// Aggregations :
// 1.En utilisant le $group, faire en sorte d'afficher le nombre de film par year
	db.movies.aggregate({
        $group:{
            _id:'$year',
            count:{
                $count:{}
            }
        }
    
    })
// 2.Même requête qu'avant, mais en affichant aussi la moyenne des rating imdb pour chaque années
	
// 3.En utilisant le $unwind et le $group, afficher le nombre de film dans lesquels chaques acteur et actrices ont joué


