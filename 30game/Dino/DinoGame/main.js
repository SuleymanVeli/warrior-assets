// Phaser oyununun konfiqurasiyası
const config = {
    type: Phaser.AUTO, // WebGL və ya Canvas renderer-i avtomatik seç
    width: 800, // Oyunun eni
    height: 600, // Oyunun hündürlüyü
    parent: 'game-container', // HTML-də oyunun yerləşəcəyi element (əgər yoxdursa, body-yə əlavə edər)
    physics: {
        default: 'arcade', // Sadə arcade fizika sistemi
        arcade: {
            gravity: { y: 3000 }, // Dinozavrın aşağı düşməsini təmin edən cazibə qüvvəsi
            debug: false // Debug rejimi (oyun obyektlərinin sərhədlərini göstərir)
        }
    },
    scene: {
        preload: preload, // Resursları yükləmək üçün funksiya
        create: create,   // Oyun obyektlərini yaratmaq üçün funksiya
        update: update    // Hər kadrda (frame) çalışan oyun döngüsü funksiyası
    },
    render: {
        pixelArt: true // Bütün oyundakı pikselləri kəskin saxlayır
    }
};

// Oyun obyekti yaradırıq
const game = new Phaser.Game(config);

// GLOBAL DƏYİŞƏNLƏR (əgər lazım olarsa)
let player; // Dinozavrımız
let ground; // Yer
let cursors; // Klaviatura idarəediciləri

// ==========================================================
// PRELOAD FUNKSİYASI: Oyun başlamazdan əvvəl resursları yükləyirik
// ==========================================================
function preload() {
    // Burada sprite vərəqələrimizi yükləyəcəyik
    // "dino_run" adını veririk, yolu göstəririk və hər kadrın ölçüsünü (genişlik, hündürlük) qeyd edirik.
    // Qaçış animasiyası 6 kadr, hər kadr 50x50px idi:

    this.load.path = 'assets/';

    // Qaçış animasiyası üçün şəkillər (məsələn 15 kadr)
    this.load.image('run1', 'dino/skeleton-Run_00.png');
    this.load.image('run2', 'dino/skeleton-Run_01.png');
    this.load.image('run3', 'dino/skeleton-Run_02.png');
    this.load.image('run4', 'dino/skeleton-Run_03.png');
    this.load.image('run5', 'dino/skeleton-Run_04.png');
    this.load.image('run6', 'dino/skeleton-Run_05.png');
    this.load.image('run7', 'dino/skeleton-Run_06.png');
    this.load.image('run8', 'dino/skeleton-Run_07.png');
    this.load.image('run9', 'dino/skeleton-Run_08.png');
    this.load.image('run10', 'dino/skeleton-Run_09.png');
    this.load.image('run11', 'dino/skeleton-Run_10.png');
    this.load.image('run12', 'dino/skeleton-Run_11.png');
    this.load.image('run13', 'dino/skeleton-Run_12.png');
    this.load.image('run14', 'dino/skeleton-Run_13.png');
    this.load.image('run15', 'dino/skeleton-Run_14.png');

    // Tullanma animasiyası üçün şəkillər (məsələn 28 kadr)
    this.load.image('jump1', 'dino/skeleton-jump_00.png');
    this.load.image('jump2', 'dino/skeleton-jump_01.png');
    this.load.image('jump3', 'dino/skeleton-jump_02.png');
    this.load.image('jump4', 'dino/skeleton-jump_03.png');
    this.load.image('jump5', 'dino/skeleton-jump_04.png');
    this.load.image('jump6', 'dino/skeleton-jump_05.png');
    this.load.image('jump7', 'dino/skeleton-jump_06.png');
    this.load.image('jump8', 'dino/skeleton-jump_07.png');
    this.load.image('jump9', 'dino/skeleton-jump_08.png');
    this.load.image('jump10', 'dino/skeleton-jump_09.png');
    this.load.image('jump11', 'dino/skeleton-jump_10.png');
    this.load.image('jump12', 'dino/skeleton-jump_11.png');
    this.load.image('jump13', 'dino/skeleton-jump_12.png');
    this.load.image('jump14', 'dino/skeleton-jump_13.png');
    this.load.image('jump15', 'dino/skeleton-jump_14.png');
    this.load.image('jump16', 'dino/skeleton-jump_15.png');
    this.load.image('jump17', 'dino/skeleton-jump_16.png');
    this.load.image('jump18', 'dino/skeleton-jump_17.png');
    this.load.image('jump19', 'dino/skeleton-jump_18.png');
    this.load.image('jump20', 'dino/skeleton-jump_19.png');
    this.load.image('jump21', 'dino/skeleton-jump_20.png');
    this.load.image('jump22', 'dino/skeleton-jump_21.png');
    this.load.image('jump23', 'dino/skeleton-jump_22.png');
    this.load.image('jump24', 'dino/skeleton-jump_23.png');
    this.load.image('jump25', 'dino/skeleton-jump_24.png');
    this.load.image('jump26', 'dino/skeleton-jump_25.png');
    this.load.image('jump27', 'dino/skeleton-jump_26.png');
    this.load.image('jump28', 'dino/skeleton-jump_27.png');


    // attack animasiyası üçün şəkillər (məsələn 15 kadr)
    this.load.image('attack1', 'dino/skeleton-Attack_00.png');
    this.load.image('attack2', 'dino/skeleton-Attack_01.png');
    this.load.image('attack3', 'dino/skeleton-Attack_02.png');
    this.load.image('attack4', 'dino/skeleton-Attack_03.png');
    this.load.image('attack5', 'dino/skeleton-Attack_04.png');
    this.load.image('attack6', 'dino/skeleton-Attack_05.png');
    this.load.image('attack7', 'dino/skeleton-Attack_06.png');
    this.load.image('attack8', 'dino/skeleton-Attack_07.png');
    this.load.image('attack9', 'dino/skeleton-Attack_08.png');
    this.load.image('attack10', 'dino/skeleton-Attack_09.png');
    this.load.image('attack11', 'dino/skeleton-Attack_10.png');
    this.load.image('attack12', 'dino/skeleton-Attack_11.png');
    this.load.image('attack13', 'dino/skeleton-Attack_12.png');
    this.load.image('attack14', 'dino/skeleton-Attack_13.png');
    this.load.image('attack15', 'dino/skeleton-Attack_14.png');




    // Yer üçün sadə bir sprite da əlavə edək (məsələn, 1x1 ağ piksel)
    this.load.image('ground', 'ground.png'); // Bu faylı assets qovluğuna əlavə etməlisiniz
    this.load.image('cactus', 'cactus.png'); // Bu faylı assets qovluğuna əlavə etməlisiniz
}

// ==========================================================
// CREATE FUNKSİYASI: Resurslar yükləndikdən sonra oyun obyektlərini yaradırıq
// ==========================================================
function create() {
    // 1. Yer (Ground) - Statik qrup
    ground = this.physics.add.staticGroup();

    // Yeri ekranın ən aşağısına yerləşdiririk
    // 60x43 ölçülü dino üçün yerin hündürlüyünü 40px edək
    let groundHeight = 40;
    let groundTile = this.add.tileSprite(
        config.width / 2, 
        config.height - (groundHeight / 2), 
        config.width, 
        groundHeight, 
        'ground'
    );
    ground.add(groundTile);

    // 2. Qaçış Animasiyası (1-15)
    this.anims.create({
        key: 'run',
        frames: [
            { key: 'run1' }, { key: 'run2' }, { key: 'run3' }, { key: 'run4' }, { key: 'run5' },
            { key: 'run6' }, { key: 'run7' }, { key: 'run8' }, { key: 'run9' }, { key: 'run10' },
            { key: 'run11' }, { key: 'run12' }, { key: 'run13' }, { key: 'run14' },
        ],
        frameRate: 30, // 60x43 ölçüdə daha axıcı görünməsi üçün bir az artırdıq
        repeat: -1
    });

    // 3. Tullanma Animasiyası (1-28)
    this.anims.create({
        key: 'jump',
        frames: [
            // { key: 'jump1' }, { key: 'jump2' }, { key: 'jump3' }, { key: 'jump4' }, { key: 'jump5' },
            // { key: 'jump6' }, { key: 'jump7' }, { key: 'jump8' }, { key: 'jump9' }, { key: 'jump10' },
            // { key: 'jump11' }, { key: 'jump12' }, { key: 'jump13' }, { key: 'jump14' }, 
            { key: 'jump15' },
            { key: 'jump16' }, { key: 'jump17' }, { key: 'jump18' }, { key: 'jump19' }, { key: 'jump20' },
            { key: 'jump21' }, { key: 'jump22' }, { key: 'jump23' },
             { key: 'jump24' }, { key: 'jump25' },
            // { key: 'jump26' }, { key: 'jump27' }, { key: 'jump28' }
        ],
        frameRate: 10 , 
        repeat: 0
    });

    this.anims.create({
        key: 'attack',
        frames: [
            { key: 'attack1' }, { key: 'attack2' }, { key: 'attack3' }, { key: 'attack4' }, { key: 'attack5' },
            { key: 'attack6' }, { key: 'attack7' }, { key: 'attack8' }, { key: 'attack9' }, { key: 'attack10' },
            { key: 'attack11' }, { key: 'attack12' }, { key: 'attack13' }, { key: 'attack14' },
        ],
        frameRate: 35, // 60x43 ölçüdə daha axıcı görünməsi üçün bir az artırdıq
        repeat: -1
    });

    // 4. Dinozavr Player (60x43 ölçüsünü nəzərə alaraq)
    // Başlanğıc mövqeyini yerdən bir az yuxarıda qoyuruq
    player = this.physics.add.sprite(100, config.height - 100, 'run1');
    
    
    // Ölçü kiçik olduğu üçün toqquşma qutusunu (hitbox) tənzimləyək
    // setSize(en, hündürlük) - şəklin içindəki boşluqları çıxmaq üçün
    player.setSize(40, 40); 
    player.setOffset(10, 3); // Şəklin mərkəzləşdirilməsi
    player.setScale(4);

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    // Fizika: Dino yerin üzərində dayansın
    this.physics.add.collider(player, ground);

    player.anims.play('run');

    // 5. İdarəetmə
    cursors = this.input.keyboard.createCursorKeys();

    x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    // Attack düyməsi üçün event listener
    x.on('down', () => {
        this.isAttacking = true;
    });
    x.on('up', () => {
        this.isAttacking = false;
    });

    obstacles = this.physics.add.group();

// Hər 1.5 saniyədən bir yeni kaktus yaradan taymer
    this.time.addEvent({
        delay: 1500, // 1500ms = 1.5 saniyə
        callback: spawnCactus,
        callbackScope: this,
        loop: true
    });

    // Dinozavr və kaktuslar toqquşanda nə baş verəcəyini təyin edirik
    this.physics.add.overlap(player, obstacles, hitObstacle, null, this);
}

// ==========================================================
// UPDATE FUNKSİYASI: Hər kadrda yenilənən oyun döngüsü
// ==========================================================
function update() {
    // Dinozavrın yerdə olub-olmadığını yoxlayırıq və Space düyməsinə basılıbsa tullanır
   if (cursors.space.isDown) {
        player.setVelocityY(-1050); // Tullanma gücü
        player.anims.play('jump', true);

        // 1. Təsadüfi Rəng Effekti (Dino və Fon üçün)
        // let color = new Phaser.Display.Color().random(100); // Parlaq rənglər
        // player.setTint(color.color);
        
        // 2. Kamera Effekti (Ekran bir anlıq parlasın və titrəsin)
        // this.cameras.main.flash(200, color.red, color.green, color.blue, 0.5);
        // this.cameras.main.shake(100, 0.01); 
    }

    // keyboard x basanda attack animasiyasını oynat buraxanda qaçışa qayıt

    if (player.body.touching.down) {

        if (this.isAttacking) {
            player.anims.play('attack', true);
        } else {
            player.anims.play('run', true);
        }
    }

    // // Yere düşəndə yenidən qaçışa qayıt
    // if (player.body.touching.down && player.anims.currentAnim.key !== 'run') {

    //     if (this.isAttacking) {
    //         player.anims.play('attack', true);
    //     } else {
    //         player.anims.play('run', true);
    //     }
    // }

    // Yer arxafonunu hərəkət etdiririk (Parallax effekti üçün)
    // Bunu daha sonra maneələr əlavə edəndə tamamlayacağıq.
    // ground.tilePositionX -= 5;
    // ground.tilePositionX += 2;

    //ground hereketi
    ground.children.iterate(function (child) {
        child.tilePositionX += 5;
    });


}

function spawnCactus() {
    // Kaktusu ekranın sağ kənarında yaradırıq
    let x = 800;
    let y = config.height - 40; // Yerin tam üzəri (yoxlayaraq tənzimlə)
    
    let cactus = obstacles.create(x, y, 'cactus');
    
    cactus.setScale(4);
    cactus.setOrigin(0.5, 1);
    
    // BAX BU ƏSASDIR:
    cactus.body.allowGravity = false; // Kaktusa cazibə təsir etməsin
    cactus.body.setImmovable(true);   // Dino ona dəyəndə kaktus yerindən oynamasın
    
    cactus.setVelocityX(-800);
}

function hitObstacle(player, cactus) {
    // Toqquşma baş verdikdə oyunu dayandırırıq
    if (this.isAttacking) {
        // --- KAKTUSU MƏHV ET ---
       // 1. Kaktusun fiziki gövdəsini söndürürük ki, itələmə baş verməsin
        cactus.body.enable = false; 

        // 2. Kaktusu yox etməzdən əvvəl kiçik bir effekt verək (məsələn, yuxarı uçsun)
        this.tweens.add({
            targets: cactus,
            y: cactus.y - 100,
            alpha: 0,
            duration: 200,
            onComplete: () => {
                cactus.destroy();
            }
        });

        // 3. Ekran sarsıntısı və rəng effekti
        this.cameras.main.shake(100, 0.02);
        
        // Ritm üçün rəngi bir daha dəyişək
        let newColor = Phaser.Display.Color.RandomRGB().color;
        player.setTint(newColor)
        
    } else {
        // --- OYUN BİTDİ ---
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.stop();
        
        this.cameras.main.shake(500, 0.03);
        
        this.time.delayedCall(1000, () => {
            this.scene.restart();
        });
    }
}