$(document).ready(function() {
    function hero (name,hp,force,img) {
        this.name = name;
        this.hp = hp;
        this.force = force;
        this.img = img;
    };

    var obi = new hero ("Obi-Wan Kenobi", 110, 25, "assets/images/svg/obiwan.svg");
    var chew = new hero ("Chewbacca", 120, 25, "assets/images/svg/chewbacca.svg");
    var vader = new hero ("Darth Vader",130, 25, "assets/images/svg/darthVader.svg");
    var maul = new hero ("Darth Maul", 140, 25, "assets/images/svg/darthMaul.svg");
    var heros = [obi, chew, vader, maul];
    var herosDiv = [$("#obi-hp"),$("#chew-hp"),$("#vader-hp"),$("#maul-hp")];
    var gameStatus = 0;
    var chosen = "";
    var enemies = "";
    var firstEnemy = "";
    var secondEnemy = "";
    var thirdEnemy = "";

    for (i = 0; i < heros.length; i++){
        var newDiv = $("<div>");
        newDiv.addClass("icon");
        var newhero= heros[i];
        newDiv.attr("id", newhero.name);
        newDiv.attr("data-force", newhero.force);
        newDiv.attr("data-hp", newhero.hp);
        $(".icons").append(newDiv);
        var newImg = $("<img>");
        newImg.attr("src", newhero.img);
        newDiv.append(newImg);
        var newhp = $("<p>");
        newhp.text(newhero.hp);
        newDiv.append(newhp);
    };

    $(".icon").on("click", function() {
        if(gameStatus === 0) {
            chosen = $(this); 
            $(".yourChar").html(chosen);
            enemies = $(".icon").not(this);
            $(".waitRoom").html(enemies);
            enemies.each(function(){$(this).addClass("enemy");});
            gameStatus = 1;
        } else if (gameStatus === 1) {
            if ($(this).hasClass("enemy")) {
                firstEnemy = $(this); 
                $(".opponent").html(firstEnemy);
                firstEnemy.addClass("defender")
                gameStatus = 2;
            }
        }
    }); 

    $(".attack").on("click", function() {
        if(gameStatus === 2) {
            var chosen_hp = chosen.attr("data-hp");
            var chosen_force = chosen.attr("data-force");
            var enemy_hp = firstEnemy.attr("data-hp");
            var enemy_force = firstEnemy.attr("data-force");
            hp = chosen_hp - enemy_force;
            enemy_hp = enemy_hp - enemy_force;
            console.log(chosen_hp, enemy_hp)
        }
    });   


});