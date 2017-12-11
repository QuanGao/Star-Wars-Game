
$(document).ready(function() {
    var chosen = "";
    var enemies = "";
    var enemy = "";
    var c_hp = 0;
    var c_force = 0;
    var e_hp = 0 ;
    var e_force = 0;
    var attackCounter = 0;
    var enemyCounter = 0;
    var message = ""; 

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

    var reset = function(){
        $(".icons").empty();
        $(".yourChar").empty();
        $(".waitRoom").empty();
        $(".opponent").empty();
        $(".progress").empty();
        $(".restart").hide();
        attackCounter = 0;
        enemyCounter = 0;
        message = "";
        chosen = "";
        enemies = "";
        enemy = "";
        for (i = 0; i < heros.length; i++){
            var newhero= heros[i];
            var newDiv = $("<div>");            
            var name = $("<p>")
            var newImg = $("<img>");
            var newhp = $("<p>");
            newDiv.attr({   
                "class": "icon hero",
                "data-force": newhero.force,
                "data-hp": newhero.hp,
                "data-name": newhero.name
            });         
            $(".icons").append(newDiv);          
            name.text(newhero.name);
            newImg.attr("src", newhero.img);
            newhp.text(newhero.hp);
            newhp.attr("class", "hp")
            newDiv.append(name).append(newImg).append(newhp);
        };
    $(".hero").on("click", function() {
        if(chosen === "") {
            chosen = $(this);
            $(".yourChar").html(chosen);
            c_hp = parseInt(chosen.attr("data-hp"));
            c_force = parseInt(chosen.attr("data-force")); 
            enemies = $(".hero").not(this);
            $(".waitRoom").html(enemies);
            enemies.each(function(){$(this).attr("class","icon enemy");});

            if(enemy === ""){
                $(".enemy").on("click", function() {                     
                        enemy = $(this);
                        e_hp = parseInt(enemy.attr("data-hp"));
                        e_force = parseInt(enemy.attr("data-force"));
                        enemy.attr("class","icon defender"); 
                        $(".opponent").html(enemy);                   
                    });
                };
                $(".attack").on("click", function(){
                    if (enemy === ""){
                        $(".progress").text("There's no enemy here");                       
                    } else if(c_hp > 0) {
                        c_hp -= e_force;
                        e_hp -= c_force + attackCounter*5;
                        chosen.find(".hp").text(c_hp);
                        enemy.find(".hp").text(e_hp);
                        message = `<p>You attacked ${enemy.attr("data-name")} for ${c_force + attackCounter*8} damage<p>` +  
                        `<p>${enemy.attr("data-name")} attacked you back for ${e_force} damage.<p>`
                        $(".progress").html(message)
                        attackCounter+=1;
                        console.log(attackCounter);
                        if(c_hp <= 0){
                            $(".progress").text("The force has abandoned you! Game over!")
                            $(".restart").show();
                        } else if(e_hp <= 0) {
                            $(".progress").text(`You have defeated ${enemy.attr("data-name")}, you can choose to fight another enemy`)
                            $(".opponent").empty(enemy);
                            enemy = "";
                            enemyCounter+=1;
                            if(enemyCounter === 3){
                                $(".progress").text("You've defeated all enemies!")   
                                $(".restart").show();  
                            };
                        };            
                    };
                });                      
            };        
        });
    };
    reset();
    $(".restart").on("click", function(){reset();});   
});