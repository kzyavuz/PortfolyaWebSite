Merhabalar. Bu projemde ReactJS, nodeJS, express ve mongo db kullanarak dinamik cv sitesi olusturdum.
Projeyi çalıstırmak için veri tabanı bağlantınızı sağladıktan sonra gerekli kütüphaneleri indirmeniz gerekmektedir.

1) İlk olarak api projesinin içine girip sırasıyla
   
     a. npm install -force  komutuyla npm kütüphanesini projeye dahil edelim.
   
     b. npm start komutuyla api ayağa kaldıralım. komut ekranında "mongodb bağlantısı başarılı" yazısı geldiğinde basarılı sekilde api ayağa kalkmıstır.
   
Api olustuğunda otomatikmen veri tabanınız olusacaktır.
   
2) AdminPAnel projesinin içine girelim
   
     a. npm intall -force komutu ile npm kütüphanesini indirelim.
   
     b. npx vite komutu ile projeyi çalıstıralım.
   
     Admin giris bilgisi isticektir. Henüz admin olmadığı için bu asamyaı geçici olarak atlicağız. bunun için gerekli adımlar şu şekilde:
   
         1. Api projesinde index.js sayfasında user methods kısmında "app.post('/SignUp', Token, userRoutes.SignUp);"
         yazan kod parçasını "app.post('/SignUp', userRoutes.SignUp);"
         bu şekilde güncelleyip token işlemini geçiyoruz. Bu sayede yeni admin olustururken admin girisi gerekmiyecektir.

   ![image](https://github.com/user-attachments/assets/3c607a9f-f576-44a5-815a-214429dfb21a)
   
         2.AdminPanel projesinde src > utils > routers > index.jsx dosyasında
            <Route element={<AuthRoute />}>
        						<Route path="/" element={<MinimalLayout />}>
        							<Route path="/SignUp" element={<Signup />} />
        						</Route>
           kodu yerine
   ![image](https://github.com/user-attachments/assets/c4aa415b-27be-4f95-81c5-2cd1fb0583e9)

           <Route>
        						<Route path="/" element={<MinimalLayout />}>
        							<Route path="/SignUp" element={<Signup />} />
        						</Route>
           kodunu yazınız.
   artık http://localhost:****/SignUp a gittiğinizde yeni kullanıcı oluturabilir ve projeye veri eklemesi yapabilirsiniz.

3) PortfolyoWebSite projesini açın ve sırasıyla npm install -force ve npm start komutlarını çalıstırın.

      Proje tamamen kuruldu ve kullanıma hazırdır.



      
