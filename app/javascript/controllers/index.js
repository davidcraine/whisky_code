// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import DropdownController from "./dropdown_controller"
application.register("dropdown", DropdownController)

import DummyController from "./dummy_controller"
application.register("dummy", DummyController)

import GoogleMapController from "./google_map_controller"
application.register("google-map", GoogleMapController)

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import LinkRedirectController from "./link_redirect_controller"
application.register("link-redirect", LinkRedirectController)

import TextSearchController from "./text_search_controller"
application.register("text-search", TextSearchController)
