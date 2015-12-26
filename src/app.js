import Fluxible from "fluxible";
import fetchrPlugin from "fluxible-plugin-fetchr";
import { RouteStore } from "fluxible-router";

import routes from "./routes";

import Application from "./Application";

import HtmlHeadStore from "./stores/HtmlHeadStore";
import IntlStore from "./stores/IntlStore";
import PartiskStore from "./stores/PartiskStore";
import AppStore from "./stores/AppStore";
import PartyStore from "./stores/PartyStore";
import TagStore from "./stores/TagStore";
import QuestionStore from "./stores/QuestionStore";
import AnswerStore from "./stores/AnswerStore";
import QuizStore from "./stores/QuizStore";
import UserStore from "./stores/UserStore";

// Create the fluxible app using Application as root component
const app = new Fluxible({ component: Application });

// Make fetchr services respond to /api endpoint
app.plug(fetchrPlugin({ xhrPath: "/api" }));

// Register a fluxible RouteStore
const AppRouteStore = RouteStore.withStaticRoutes(routes);
app.registerStore(AppRouteStore);

// Register app-specific stores
app.registerStore(AppStore);
app.registerStore(HtmlHeadStore);
app.registerStore(IntlStore);
app.registerStore(PartiskStore);
app.registerStore(PartyStore);
app.registerStore(TagStore);
app.registerStore(QuestionStore);
app.registerStore(AnswerStore);
app.registerStore(QuizStore);
app.registerStore(UserStore);

export default app;
