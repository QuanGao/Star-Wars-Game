$(document).ready(function() {
    function hero (name,sname,hp,force,img) {
        this.name = name;
        this.sname = sname;
        this.hp = hp;
        this.force = force;
        this.img = img;
    };

    var obi = new hero ("Obi-Wan Kenobi", "obi", 110, 25, "assets/images/svg/obiwan.svg");
    var chew = new hero ("Chewbacca", "chew", 120, 25, "assets/images/svg/chewbacca.svg");
    var vader = new hero ("Darth Vader","vader", 130, 25, "assets/images/svg/darthVader.svg");
    var maul = new hero ("Darth Maul", "maul", 140, 25, "assets/images/svg/darthMaul.svg");
    var heros = [obi, chew, vader, maul];
    var herosDiv = [$("#obi-hp"),$("#chew-hp"),$("#vader-hp"),$("#maul-hp")];
    var gameStatus = 0;
    var chosen;
    var enemies;
    var firstEnemy;
    var secondEnemy;
    var thirdEnemy;
    var c_hp;
    var c_force;
    var e_hp;
    var e_force;

    for (i = 0; i < heros.length; i++){
        var newDiv = $("<div>");
        newDiv.addClass("icon");
        var newhero= heros[i];
        newDiv.attr("data-force", newhero.force);
        newDiv.attr("data-hp", newhero.hp);
        $(".icons").append(newDiv);
        var name = $("<p>")
        name.text(newhero.name);
        newDiv.append(name);
        var newImg = $("<img>");
        newImg.attr("src", newhero.img);
        newDiv.append(newImg);
        var newhp = $("<h3>");
        newhp.attr("id", newhero.sname);
        newhp.attr("class", "hp")
        newhp.text(newhero.hp);
        newDiv.append(newhp);
    };

    $(".icon").on("click", function() {
        if(gameStatus === 0) {
            chosen = $(this);
            c_hp = parseInt(chosen.attr("data-hp"));
            c_force = parseInt(chosen.attr("data-force")); 
            $(".yourChar").html(chosen);
            enemies = $(".icon").not(this);
            $(".waitRoom").html(enemies);
            enemies.each(function(){$(this).addClass("enemy");});
            gameStatus = 1;
        } else if (gameStatus === 1) {
            if ($(this).hasClass("enemy")) {
                firstEnemy = $(this);
                e_hp = parseInt(firstEnemy.attr("data-hp"));
                e_force = parseInt(firstEnemy.attr("data-force"));
                $(".opponent").html(firstEnemy);
                firstEnemy.addClass("defender")
                gameStatus = 2;             
            }        
        }
    }); 



    $(".attack").on("click", function() {
        $("#obi").text("hi");
        if(gameStatus === 2) {
            c_hp -= e_force;
            e_hp -= c_force;
            console.log(chosen.attr("id"));
            // chosen.last().text("hi");
           

            console.log(`hero hp: ${c_hp}, enempy hp: ${e_hp}, hero force: ${c_force}, enmey force: ${e_force}`);
        }
            
    });

});