"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var services_1 = require("../services");
var models_1 = require("../models");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var router_1 = require("@angular/router");
var ListComponent = (function () {
    function ListComponent(routerExtensions, firebaseService, router) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.router = router;
    }
    ListComponent.prototype.ngOnInit = function () {
        this.gifts$ = this.firebaseService.getMyWishList();
        this.message$ = this.firebaseService.getMyMessage();
    };
    ListComponent.prototype.add = function () {
        var _this = this;
        this.gift = new models_1.Gift(this.id, this.name, this.date, this.description, this.imagepath, this.UID);
        var myGift = this.gift.name;
        this.firebaseService.add(myGift).then(function (message) {
            _this.name = "";
            alert(message);
        });
    };
    ListComponent.prototype.delete = function (gift) {
        this.firebaseService.delete(gift)
            .catch(function () {
            alert("An error occurred while deleting an item from your list.");
        });
    };
    ListComponent.prototype.viewDetail = function (id) {
        this.router.navigate(["/list-detail", id]);
    };
    ListComponent.prototype.logout = function () {
        this.firebaseService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    };
    return ListComponent;
}());
ListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "gf-list",
        templateUrl: "list.html"
    }),
    __metadata("design:paramtypes", [router_extensions_1.RouterExtensions,
        services_1.FirebaseService,
        router_1.Router])
], ListComponent);
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUdoRCx3Q0FBNEQ7QUFDNUQsb0NBQStCO0FBQy9CLG1GQUErRTtBQUMvRSwwQ0FBdUM7QUFPdkMsSUFBYSxhQUFhO0lBYXhCLHVCQUFvQixnQkFBa0MsRUFDNUMsZUFBZ0MsRUFDaEMsTUFBYztRQUZKLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDNUMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDbkIsQ0FBQztJQUVSLGdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFRLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNELENBQUM7SUFFQywyQkFBRyxHQUFIO1FBQUEsaUJBY0M7UUFiRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBSSxDQUNuQixJQUFJLENBQUMsRUFBRSxFQUNQLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNYLElBQUksTUFBTSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQVc7WUFDaEQsS0FBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUE7SUFFSixDQUFDO0lBRUQsOEJBQU0sR0FBTixVQUFPLElBQVU7UUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDOUIsS0FBSyxDQUFDO1lBQ0wsS0FBSyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLEVBQVU7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsOEJBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFFLENBQUM7SUFDdEUsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXRERCxJQXNEQztBQXREWSxhQUFhO0lBTHpCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLFdBQVc7S0FDekIsQ0FBQztxQ0Fjc0Msb0NBQWdCO1FBQzNCLDBCQUFlO1FBQ3hCLGVBQU07R0FmYixhQUFhLENBc0R6QjtBQXREWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHtCYWNrZW5kU2VydmljZSwgRmlyZWJhc2VTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXNcIjtcbmltcG9ydCB7R2lmdH0gZnJvbSBcIi4uL21vZGVsc1wiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXIvcm91dGVyLWV4dGVuc2lvbnMnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogXCJnZi1saXN0XCIsXG4gIHRlbXBsYXRlVXJsOiBcImxpc3QuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgZGF0ZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBpbWFnZXBhdGg6IHN0cmluZztcbiAgVUlEOiBzdHJpbmc7XG4gIHB1YmxpYyBnaWZ0OiBHaWZ0O1xuXG4gIHB1YmxpYyBnaWZ0cyQ6IE9ic2VydmFibGU8YW55PjtcbiAgcHVibGljIG1lc3NhZ2UkOiBPYnNlcnZhYmxlPGFueT47XG4gIFxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICAgKSB7fVxuXG5uZ09uSW5pdCgpe1xuICB0aGlzLmdpZnRzJCA9IDxhbnk+dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0TXlXaXNoTGlzdCgpO1xuICB0aGlzLm1lc3NhZ2UkID0gPGFueT50aGlzLmZpcmViYXNlU2VydmljZS5nZXRNeU1lc3NhZ2UoKTtcbn1cblxuICBhZGQoKSB7XG4gICAgIHRoaXMuZ2lmdCA9IG5ldyBHaWZ0KFxuICAgICAgdGhpcy5pZCxcbiAgICAgIHRoaXMubmFtZSxcbiAgICAgIHRoaXMuZGF0ZSxcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICB0aGlzLmltYWdlcGF0aCxcbiAgICAgIHRoaXMuVUlEKVxuICAgIGxldCBteUdpZnQ6c3RyaW5nID0gdGhpcy5naWZ0Lm5hbWU7XG4gICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuYWRkKG15R2lmdCkudGhlbigobWVzc2FnZTphbnkpID0+IHtcbiAgICAgIHRoaXMubmFtZSA9IFwiXCI7XG4gICAgICBhbGVydChtZXNzYWdlKTtcbiAgICB9KSAgIFxuICAgIFxuICB9XG5cbiAgZGVsZXRlKGdpZnQ6IEdpZnQpIHtcbiAgICB0aGlzLmZpcmViYXNlU2VydmljZS5kZWxldGUoZ2lmdClcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGFsZXJ0KFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZGVsZXRpbmcgYW4gaXRlbSBmcm9tIHlvdXIgbGlzdC5cIik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHZpZXdEZXRhaWwoaWQ6IHN0cmluZyl7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2xpc3QtZGV0YWlsXCIsIGlkXSk7XG4gIH1cblxuICBsb2dvdXQoKSB7XG4gICAgdGhpcy5maXJlYmFzZVNlcnZpY2UubG9nb3V0KCk7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSApO1xuICB9XG59XG5cbiJdfQ==