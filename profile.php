<?php
    require 'header.php';
?>
        <div class="center">
                <img src="./assets/clipart/no-title.jpg"  class="cent" >
                <br>
                <div class="container profile-head">
                <h1>Jane Doe</h1>
                
                <p  class="title"><img class="job" src="./assets/clipart/briefcase (1).png"> CEO & Founder</p>
                <p class="area"><img class="job" src="./assets/clipart/pin (1).png">Damascuse</p>
            </div>
        </div>
         <br>
        <div class="tab">
        
        
                <button class="tablinks" onclick="openTab('Profaile',this)" id="defaultOpen"><b>الملف الشخصي </b></button>
                <button class="tablinks" onclick="openTab( 'projectA', this)"><b>المشاريع التي شارك بها </b></button>
                <button class="tablinks" onclick="openTab('projectB', this)"><b> المشاريع التي طرحها </b></button>
                
        </div>
        

        <div id="Profaile" class="tabcontent">
            
            <form class="profile-forms">
                <div class="pr">
                <h3 class="profile-section"> <img class="job1" src="./assets/clipart/1006517.png">تعريف بي:</h3>
        <hr>
                  <p class="hello"><h4>السلام عليكم.
        
                        انا مهندس ديكور على استعداد كامل لعمل اي منظور داخلي او خارجي.
                        <br>
                        عمل المخططات التنفيذية على الاوتوكاد او التعديل الكامل لمن يرغب.
                        <br>
        
                        السعر حسب حجم المشروع سواء اوتوكاد او 3D.
                        التسليم حسب حجم المشروع ووقت الزبون.
                        <br>
                        الموقع الالكتروني. www2design3dcom
                        
                        ارجو التواصل لمن يريد وقم بسوالي عن اي نصيحة مجانية.</p>
                        <br>
                  </h4>
                        <h3 class="profile-section"><img class="job1" src="./assets/clipart/skills (1).png">مهاراتي:</h3>
                        <hr>
                        <p>
                            <ul class="my-skills">
                                    <h4>
                                <li>
                                   
                                     تصميم 3D
                                    </h4>
                                    </li>
                                    <h4>
                                <li>
                                    
                                   تصميم الأثاث
                                </h4>
                                   </li>
                                   <h4>
                                   <li>
                                   
                                       البناء المعماري
                                    </h4>
                                       
                                   </li>
                            </ul>
                            <br>
                            <br>
                        </p>
                    </div>
                    </form>
              </div>   

              <div id="projectA" class="tabcontent">
                  <form class="profile-forms">
                      <div class="pr">

                        <h3 class="profile-section"><img class="job1" src="./assets/clipart/decision.png">المشاريع التي شارك بها:</h3>
                        <hr>
                        <p class="lii">
                                <img class="job2" src="./assets/clipart/291201.png">
                                لوغو لقناة يوتيوب 
                            </p>
                            <p>
                                    <img class="job2" src="./assets/clipart/189061.png"> سامر العلي
                                    <img class="job3" src="./assets/clipart/circular-clock.png"> تم عرضه منذ سنتين
                                    <img class="job3" src="./assets/clipart/counterclockwise-rotating-arrow-around-a-clock.png"> 10 أيام
                            </p>
                            <hr>

                            <p class="lii">
                                    <img class="job2" src="./assets/clipart/189678.png">
                                    عمل فيديو إعلاني
                                </p>
                                <p>
                                        <img class="job2" src="./assets/clipart/189061.png"> مجد سلامة
                                        <img class="job3" src="./assets/clipart/circular-clock.png"> تم عرضه منذ سنة
                                        
                                </p>
                                <hr>
                                <p class="lii">
                                        <img class="job2" src="./assets/clipart/595067.png">
                                        إدارة حساب إنستغرام 
                                    </p>
                                    <p>
                                            <img class="job2" src="./assets/clipart/189061.png"> علاء بدر
                                            <img class="job3" src="./assets/clipart/circular-clock.png"> تم عرضه منذ سنتين
                                            <img class="job3" src="./assets/clipart/counterclockwise-rotating-arrow-around-a-clock.png"> قيد التنفيذ
                                    </p>
                                    <hr>
                      </div>
                  </form>
                    
            </div>
            
            <div id="projectB" class="tabcontent">
              
            <form class="profile-forms">
                    <div class="pr">
                            <h3 class="profile-section"><img class="job1" src="./assets/clipart/Business_Ideas-128.png">المشاريع التي طرحها:</h3>
                            <hr>

                    </div>
            </form>    
            </div>
            
            
            
        <script>
                function openTab(pageName,elmnt) {
                  var i, tabcontent, tablinks;
                  tabcontent = document.getElementsByClassName("tabcontent");
                  for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                  }
                  tablinks = document.getElementsByClassName("tablinks");
                  for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].style.backgroundColor = "";
                  }
                  document.getElementById(pageName).style.display = "block";
                  elmnt.style.backgroundColor = "white";
                 
                }
                
                // Get the element with id="defaultOpen" and click on it
                document.getElementById("defaultOpen").click();
                </script>
                 

                 <?php 
    require 'footer.php';
?>