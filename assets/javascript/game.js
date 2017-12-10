$(document).ready(function() {
    function hero (name,hp,force,img) {
        this.name = name;
        this.hp = hp;
        this.force = force;
        this.img = img;
    };
    var obi = new hero ("Obi-Wan Kenobi", 128, 8, "assets/images/svg/obiwan.svg");
    var chew = new hero ("Chewbacca", 100, 5, "assets/images/svg/chewbacca.svg");
    var vader = new hero ("Lord Vader", 150, 25, "assets/images/svg/darthVader.svg");
    var maul = new hero ("Darth Maul", 180, 28, "assets/images/svg/darthMaul.svg");
    var heros = [obi, chew, vader, maul];
    var gameStatus;
    var chosen;
    var enemies;
    var firstEnemy;
    var secondEnemy;
    var thirdEnemy;
    var c_hp;
    var c_force;
    var e_hp;
    var e_force;
    var attackCounter;
    var message; 

    var reset = function(){
        $(".icons").empty();
        $(".yourChar").empty(chosen);
        $(".waitRoom").empty(enemies);
        $(".opponent").empty();
        $(".progress").empty();
        $(".restart").hide();
        attackCounter = 0;
        message = "";
        gameStatus = 0; 
        for (i = 0; i < heros.length; i++){
            var newDiv = $("<div>");
            newDiv.addClass("icon");
            var newhero= heros[i];
            newDiv.attr("data-force", newhero.force);
            newDiv.attr("data-hp", newhero.hp);
            newDiv.attr("data-name", newhero.name);
            $(".icons").append(newDiv);
            var name = $("<p>")
            name.text(newhero.name);
            newDiv.append(name);
            var newImg = $("<img>");
            newImg.attr("src", newhero.img);
            newDiv.append(newImg);
            var newhp = $("<p>");
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
                    firstEnemy.removeClass("enemy");
                    firstEnemy.addClass("defender")
                    gameStatus = 2;             
                }        
            }
        });
    };
    reset();

    $(".attack").on("click", function() {
        if(gameStatus === 2) {
            c_hp -= e_force;
            e_hp -= c_force*(attackCounter+1);
            chosen.find(".hp").text(c_hp);
            firstEnemy.find(".hp").text(e_hp);
            message = `<p>You attacked ${firstEnemy.attr("data-name")} for ${c_force*(attackCounter+1)} damage<p>` +  
            `<p>${firstEnemy.attr("data-name")} attacked you back for ${e_force} damage.<p>`
            $(".progress").html(message)
            attackCounter+=1;
            if (c_hp < 0){
                gameStatus = 0;
                $(".progress").text("The force has abandoned you! Game over!")
                $(".restart").show();
                $(".restart").on("click", function(){
                reset();   
                })
            }  else if (e_hp < 0){
                $(".progress").text(`You have defeated ${firstEnemy.attr("data-name")}, you can choose to fight another enemy`)
                $(".enemy").on("click", function() {
                    secondEnemy = $(this);
                    e_hp = parseInt(secondEnemy.attr("data-hp"));
                    e_force = parseInt(secondEnemy.attr("data-force"));
                    $(".opponent").html(secondEnemy);
                    secondEnemy.addClass("defender")
                    gameStatus = 3;    
                });
            }         
        }
       if(gameStatus === 3){
            c_hp -= e_force;
            e_hp -= c_force*(attackCounter+1);
            chosen.find(".hp").text(c_hp);
            secondEnemy.find(".hp").text(e_hp);
            message = `<p>You attacked ${secondEnemy.attr("data-name")} for ${c_force*(attackCounter+1)} damage<p>` +  
            `<p>${secondEnemy.attr("data-name")} attacked you back for ${e_force} damage.<p>`
            $(".progress").html(message)
            attackCounter+=1;
            if (c_hp < 0){
                gameStatus = 0;
                $(".progress").text("The force has abandoned you! Game over!")
                $(".restart").show();
                $(".restart").on("click", function(){
                reset();   
                })
            }  else if (e_hp < 0){
                $(".progress").text(`You have defeated ${secondEnemy.attr("data-name")}, you can choose to fight another enemy`)
                $(".enemy").on("click", function() {
                    thirdEnemy = $(this);
                    e_hp = parseInt(thirdEnemy.attr("data-hp"));
                    e_force = parseInt(thirdEnemy.attr("data-force"));
                    $(".opponent").html(thirdEnemy);
                    thirdEnemy.addClass("defender")
                    gameStatus = 3;    
                });
            }                  
        }     
    });

});