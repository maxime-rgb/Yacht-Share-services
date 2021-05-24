<?php 

include 'partials/header.php';

?>

<header>
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
      <!-- Slide One - Set the background image for this slide in the line below -->
      <div class="carousel-item active" style="background-image: url('/images/octopus.png')">
        <div class="carousel-caption d-none d-md-block">
        <h2 class="display-4" style="color: white">The Octopus</h2>
          <p class="lead">Offering a genuine first-class experience while cruising or at anchor</p>
        </div>
      </div>
      <!-- Slide Two - Set the background image for this slide in the line below -->
      <div class="carousel-item" style="background-image: url('/images/octo1.png')">
        <div class="carousel-caption d-none d-md-block">

        </div>
      </div>
      <!-- Slide Three - Set the background image for this slide in the line below -->
      <div class="carousel-item" style="background-image: url('/images/octo2.png')">
        <div class="carousel-caption d-none d-md-block">

        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
  </div>
</header>

<section class="page3">

    <div class="header-describe"> 
        <div class="title">
              <h1>Octopus - 126 Meters</h1>
              <h2>Harbor</h2>
        </div>
        <div class="texte ">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>  
            <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div> 
    </div>
    <div class="body">
      <div class=" col-12 col-9@md">
      <?php include 'partials/centerbox.php' ?>
      </div>

      
      <div class="recap col-12 col-3@md">
          <div class="box-recap">
                  <h2>Order Summary</h2>
                  <h3>Octopus</h3>
                  <h4>126 Meters</h4>
                  <h5>Crew : 26</h5>
                <div class="selecter">
                Departure<input type="date" name="dateoflocation" id="dateoflocation">
                Arrivate<input type="date" name="dateoflocation" id="dateoflocation">
                    <Select name="pers">
                        <option> Nbrs of persons </option>
                        <option>1 pers.</option>
                        <option>2 pers.</option>
                        <option>3 pers.</option>
                        <option>4 pers.</option>
                        <option>5 pers.</option>
                        <option>6 pers.</option>
                    </Select>
                </div>
              <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p>
          </div>        
              <button class="book-boat">BOOK</button>
      </div>
      </div>
    </div> 
</section>
<div class="carousel-container">
        <div class="carousel-card" id="far-left">
            <img class="carousel-icon" src="/images/luxe.jpg" alt="">
            <h4 class="carousel-title">Yacht Luxe</h4>
            <h5>07/17/2021 by Prestige Yacht.</h5>
            <p class="carousel-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
            <button class="btn btn--accent-lighter">Read more...</button>
        </div>
        <div class="carousel-card" id="left">
            <img class="carousel-icon" src="/images/voile.jpg" alt="">
            <h4 class="carousel-title">Yacht Voile</h4>
            <h5>07/17/2021 by Prestige Yacht.</h5>
            <p class="carousel-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
            <button class="btn btn--accent-lighter">Read more...</button>
        </div>
        <div class="carousel-card" id="center">
            <img class="carousel-icon" src="/images/big.jpg" alt="">
            <h4 class="carousel-title">Yacht Big</h4>
            <h5>07/17/2021 by Prestige Yacht.</h5>
            <p class="carousel-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
            <button class="btn btn--accent-lighter">Read more...</button>
        </div>
        <div class="carousel-card" id="right">
            <img class="carousel-icon" src="/images/int.jpg" alt="">
            <h4 class="carousel-title">Yacht Private</h4>
            <h5>07/17/2021 by Prestige Yacht.</h5>
            <p class="carousel-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
            <button class="btn btn--accent-lighter">Read more...</button>
        </div>
        <div class="carousel-card" id="far-right">
            <img class="carousel-icon" src="/images/small.jpg" alt="">
            <h4 class="carousel-title">Yacht Small</h4>
            <h5>07/17/2021 by Prestige Yacht.</h5>
            <p class="carousel-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
            <button class="btn btn--accent-lighter">Read more...</button>
        </div>
    </div>
</section>



<?php 

include 'partials/footer.php';

?>
