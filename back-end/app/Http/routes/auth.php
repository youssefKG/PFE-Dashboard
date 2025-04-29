
<?php

use illuminate\support\facades\route;

use app\http\controllers\api\authcontroller;

route::post("/auth/login", [authcontroller::class, "login"]);
route::post("/auth/register", [authcontroller::class, "register"]);
route::get("/auth/logout", [authcontroller::class, "logout"]);
