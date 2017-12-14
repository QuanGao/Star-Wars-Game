$(document).ready(function() {
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

    var getHp = function(jedi){
        return parseInt(jedi.attr("data-hp"));
    };
    var getForce = function(jedi){
        return parseInt(jedi.attr("data-force"));
    };
    var addHeroStatsToDivAttri = function(heroObj,div){
        div.attr({   
            "class": "icon hero",
            "data-force": heroObj.force,
            "data-hp": heroObj.hp,
            "data-name": heroObj.name 
        }); 
    };
    var insertImageHpNameToDiv = function(heroObj,div){
        var name = $("<p>")
        var newImg = $("<img>");
        var newhp = $("<p>");
        name.text(heroObj.name);
        newImg.attr("src", heroObj.img);
        newhp.text(heroObj.hp);
        newhp.attr("class", "hp");
        div.append(name).append(newImg).append(newhp);
    };
    var displayHeros = function(arr){
        for (i = 0; i < arr.length; i++){
            var newhero= heros[i];
            var newDiv = $("<div>");            
            addHeroStatsToDivAttri(newhero, newDiv);               
            $(".icons").append(newDiv);          
            insertImageHpNameToDiv(newhero,newDiv)         
        };
    };
    var clearDynamicSections = function(){
        $(".icons").empty();
        $(".yourChar").empty();
        $(".waitRoom").empty();
        $(".opponent").empty();
        $(".progress").empty();
        $(".restart").hide();
    };
    var reset = function(){
        clearDynamicSections();
        attackCounter = 0;
        enemyCounter = 0;
        isHeroChosen = false;
        isEnimeyChosen = false;
        displayHeros(heros);
    }; 
    var changeClass = function(x, oldClass, newClass){
        x.removeClass(oldClass);
        x.addClass(newClass)
    };
    var onKill = function(enemyJedi){
        $(".progress").text(`You have defeated ${enemyJedi.attr("data-name")}, you can choose to fight another enemy`)
        $(".opponent").empty($(enemyJedi));
        isEnimeyChosen = false;
        enemyCounter+=1;
        e_force = 0;
    };

    var onWin = function(){
        $(".progress").text("You've defeated all enemies!")   
        $(".restart").show();  
    };
    var onLost = function(){
        $(".progress").text("The force has abandoned you! Game over!")
        $(".restart").show(); 
    }

    reset();

    $(".icons").on("click", ".hero", function() {
        if(!isHeroChosen) {            
            var chosen = $(this);
            $(".yourChar").html(chosen);
            c_hp = getHp(chosen);
            c_force = getForce(chosen);
            var notChosen = $(".hero").not(this);
            $(".waitRoom").html(notChosen);
            changeClass(chosen, "hero", "yourChampion");
            changeClass(notChosen, "hero", "enemy");
            isHeroChosen = true;
        };
    }); 

    $(".waitRoom").on("click",".enemy",function() {
        if(!isEnimeyChosen) {               
            var enemy = $(this);
            e_hp = getHp(enemy);
            e_force = getForce(enemy);
            changeClass(enemy, "enemy", "defender");
            $(".opponent").html(enemy); 
            isEnimeyChosen = true; 
        };                
    });
    
    $(".attack").on("click", function(){
        if(!isEnimeyChosen){
            $(".progress").text("There's no enemy here");                       
        } else if(c_hp > 0) {
            $(".saberClash")[0].play();               
            var newForce = c_force + attackCounter*8;
            attackCounter+=1;   
            e_hp -= newForce;
            $(".defender").find(".hp").text(e_hp);
            if(e_hp <= 0) {
                onKill($(".defender"));
                if(enemyCounter === 3){
                    onWin();
                };
            } else {
                c_hp -= e_force;
                $(".yourChampion").find(".hp").text(c_hp);
                var message = `<p>You attacked ${$(".defender").attr("data-name")} for ${newForce} damage<p>` + `<p>${$(".defender").attr("data-name")} attacked you back for ${e_force} damage.<p>`                
                $(".progress").html(message); 
                if(c_hp <= 0){
                    onLose();
                };
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

