
$(document).ready(function() {
    var chosen = "";
    var enemy = "";
    var c_hp = 0;
    var c_force = 0;
    var e_hp = 0 ;
    var e_force = 0;
    var attackCounter = 0;
    var enemyCounter = 0;
    var isHeroChosen = false;
    var isEnimeyChosen = false;

    function hero (name,hp,force,img) {
        this.name = name;
        this.hp = hp;
        this.force = force;
        this.img = img;
    };
    var obi = new hero ("Obi-Wan Kenobi", 120, 8, "assets/images/svg/obiwan.svg");
    var chew = new hero ("Chewbacca", 100, 5, "assets/images/svg/chewbacca.svg");
    var vader = new hero ("Lord Vader", 150, 20, "assets/images/svg/darthVader.svg");
    var maul = new hero ("Darth Maul", 180, 25, "assets/images/svg/darthMaul.svg");
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
        chosen = "";
        enemy = "";
        isHeroChosen = false;
        isEnimeyChosen = false;

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
    }; 
    reset();
    $(".icons").on("click", ".hero", function() {
        console.log(isHeroChosen);
        if(!isHeroChosen) {            
            chosen = $(this);
            var notChosen = $(".hero").not(this)
            $(".yourChar").html(chosen);
            c_hp = parseInt(chosen.attr("data-hp"));
            c_force = parseInt(chosen.attr("data-force"));
            $(".waitRoom").html(notChosen);
            notChosen.removeClass("hero");
            notChosen.addClass("enemy");
            chosen.removeClass("hero");
            chosen.addClass("selected");
            isHeroChosen = true;
        };
    }); 
 
    $(".waitRoom").on("click",".enemy",function() {
        console.log("enimy cicked");
        if(!isEnimeyChosen) {               
            enemy = $(this);
            e_hp = parseInt(enemy.attr("data-hp"));
            e_force = parseInt(enemy.attr("data-force"));
            enemy.attr("class","icon defender"); 
            $(".opponent").html(enemy); 
            isEnimeyChosen = true; 
        };                
    });

    $(".attack").unbind("click").bind("click", function(){
        if(!isEnimeyChosen){
            $(".progress").text("There's no enemy here");                       
        } else if(c_hp > 0) {
            $(".saberClash")[0].play();               
            var newForce = c_force + attackCounter*8;
            attackCounter+=1;   
            e_hp -= newForce;
            enemy.find(".hp").text(e_hp);
            if(e_hp <= 0) {
                $(".progress").text(`You have defeated ${enemy.attr("data-name")}, you can choose to fight another enemy`)
                $(".opponent").empty(enemy);
                isEnimeyChosen = false;
                enemyCounter+=1;
                e_force = 0;
                if(enemyCounter === 3){
                    $(".progress").text("You've defeated all enemies!")   
                    $(".restart").show();  
                };
            };
            c_hp -= e_force;
            chosen.find(".hp").text(c_hp);
            var message = `<p>You attacked ${enemy.attr("data-name")} for ${newForce} damage<p>` + `<p>${enemy.attr("data-name")} attacked you back for ${e_force} damage.<p>`                
            $(".progress").html(message); 
            if(c_hp <= 0){
                $(".progress").text("The force has abandoned you! Game over!")
                $(".restart").show(); 
            };     
        };                       
    });                      
    $(".restart").on("click", function(){reset();});
    $(".theme").click(function(){
        $(this).toggleClass("active");
        if($(this).hasClass("active")){
            $(this).text("pause"); 
            $(".opening")[0].play();       
        } else {
            $(this).text("play");
            $(".opening")[0].pause();
        };
    });
});

