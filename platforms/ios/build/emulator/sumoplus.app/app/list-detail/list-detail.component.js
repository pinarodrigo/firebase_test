"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var services_1 = require("../services");
var enums = require("ui/enums");
var imageSource = require("image-source");
var camera = require("nativescript-camera");
var imageModule = require("ui/image");
var img;
var ListDetailComponent = (function () {
    function ListDetailComponent(route, router, ngZone, firebaseService, utilsService) {
        this.route = route;
        this.router = router;
        this.ngZone = ngZone;
        this.firebaseService = firebaseService;
        this.utilsService = utilsService;
    }
    ListDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        camera.requestPermissions();
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.firebaseService.getMyGift(_this.id).subscribe(function (gift) {
                _this.ngZone.run(function () {
                    for (var prop in gift) {
                        //props
                        if (prop === "id") {
                            _this.id = gift[prop];
                        }
                        if (prop === "name") {
                            _this.name = gift[prop];
                        }
                        if (prop === "description") {
                            _this.description = gift[prop];
                        }
                        if (prop === "imagepath") {
                            _this.imagepath = gift[prop];
                        }
                    }
                });
            });
        });
    };
    ListDetailComponent.prototype.takePhoto = function () {
        var _this = this;
        var options = {
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: true
        };
        camera.takePicture(options)
            .then(function (imageAsset) {
            imageSource.fromAsset(imageAsset).then(function (res) {
                _this.image = res;
                //save the source image to a file, then send that file path to firebase
                _this.saveToFile(_this.image);
            });
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
    };
    ListDetailComponent.prototype.saveToFile = function (res) {
        var imgsrc = res;
        this.imagePath = this.utilsService.documentsPath("photo-" + Date.now() + ".png");
        imgsrc.saveToFile(this.imagePath, enums.ImageFormat.png);
    };
    ListDetailComponent.prototype.editGift = function (id) {
        var _this = this;
        if (this.image) {
            //upload the file, then save all
            this.firebaseService.uploadFile(this.imagePath).then(function (uploadedFile) {
                _this.uploadedImageName = uploadedFile.name;
                //get downloadURL and store it as a full path;
                _this.firebaseService.getDownloadUrl(_this.uploadedImageName).then(function (downloadUrl) {
                    _this.firebaseService.editGift(id, _this.description, downloadUrl).then(function (result) {
                        alert(result);
                    }, function (error) {
                        alert(error);
                    });
                });
            }, function (error) {
                alert('File upload error: ' + error);
            });
        }
        else {
            //just edit the description
            this.firebaseService.editDescription(id, this.description).then(function (result) {
                alert(result);
            }, function (error) {
                alert(error);
            });
        }
    };
    return ListDetailComponent;
}());
ListDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "gf-list-detail",
        templateUrl: "list-detail.html"
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        core_1.NgZone,
        services_1.FirebaseService,
        services_1.UtilsService])
], ListDetailComponent);
exports.ListDetailComponent = ListDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlzdC1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdEO0FBRXhELDBDQUF1RDtBQUN2RCx3Q0FBNEQ7QUFFNUQsZ0NBQWtDO0FBQ2xDLDBDQUE0QztBQUk1Qyw0Q0FBOEM7QUFHOUMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RDLElBQUksR0FBRyxDQUFDO0FBT1IsSUFBYSxtQkFBbUI7SUFhOUIsNkJBQ2MsS0FBcUIsRUFDckIsTUFBYyxFQUNkLE1BQWMsRUFDZCxlQUFnQyxFQUNoQyxZQUEwQjtRQUoxQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUNuQyxDQUFDO0lBRVAsc0NBQVEsR0FBUjtRQUFBLGlCQXdCRTtRQXZCQSxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQVc7WUFDaEQsS0FBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7Z0JBQ3JELEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO29CQUNkLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLE9BQU87d0JBQ1AsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElB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Q0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDLEVBQUUsVUFBQyxLQUFVO2dCQUNaLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNKLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQVU7Z0JBQ3RFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNqQixDQUFDLEVBQUUsVUFBQyxLQUFVO2dCQUNWLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQsMEJBQUM7QUFBRCxDQUFDLEFBcEdELElBb0dDO0FBcEdZLG1CQUFtQjtJQUwvQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLGtCQUFrQjtLQUNoQyxDQUFDO3FDQWVxQix1QkFBYztRQUNiLGVBQU07UUFDTixhQUFNO1FBQ0csMEJBQWU7UUFDbEIsdUJBQVk7R0FsQjdCLG1CQUFtQixDQW9HL0I7QUFwR1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7Um91dGVyLCBBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSwgVXRpbHNTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzXCI7XG5pbXBvcnQge0dpZnR9IGZyb20gXCIuLi9tb2RlbHNcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gJ3VpL2VudW1zJztcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gJ2ltYWdlLXNvdXJjZSc7XG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XG5cbmltcG9ydCAqIGFzIGNhbWVyYSBmcm9tIFwibmF0aXZlc2NyaXB0LWNhbWVyYVwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5cbnZhciBpbWFnZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9pbWFnZVwiKTtcbnZhciBpbWc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogXCJnZi1saXN0LWRldGFpbFwiLFxuICB0ZW1wbGF0ZVVybDogXCJsaXN0LWRldGFpbC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgTGlzdERldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIFxuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGltYWdlcGF0aDogc3RyaW5nO1xuICBpbWFnZTogYW55O1xuICBwcml2YXRlIHN1YjogYW55O1xuICBwcml2YXRlIGltYWdlUGF0aDogc3RyaW5nO1xuICBwcml2YXRlIHVwbG9hZGVkSW1hZ2VOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgdXBsb2FkZWRJbWFnZVBhdGg6IHN0cmluZztcbiAgcHVibGljIGdpZnQ6IE9ic2VydmFibGU8YW55PjtcbiAgXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZVxuICAgICkge31cblxuIG5nT25Jbml0KCkge1xuICAgY2FtZXJhLnJlcXVlc3RQZXJtaXNzaW9ucygpO1xuICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUoKHBhcmFtczogYW55KSA9PiB7XG4gICAgICB0aGlzLmlkID0gcGFyYW1zWydpZCddO1xuICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0TXlHaWZ0KHRoaXMuaWQpLnN1YnNjcmliZSgoZ2lmdCkgPT4ge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gZ2lmdCkge1xuICAgICAgICAgICAgLy9wcm9wc1xuICAgICAgICAgICAgaWYgKHByb3AgPT09IFwiaWRcIikge1xuICAgICAgICAgICAgICB0aGlzLmlkID0gZ2lmdFtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9wID09PSBcIm5hbWVcIikge1xuICAgICAgICAgICAgICB0aGlzLm5hbWUgPSBnaWZ0W3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb3AgPT09IFwiZGVzY3JpcHRpb25cIikge1xuICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZ2lmdFtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9wID09PSBcImltYWdlcGF0aFwiKSB7XG4gICAgICAgICAgICAgIHRoaXMuaW1hZ2VwYXRoID0gZ2lmdFtwcm9wXTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTsgIFxuICB9XG5cbnRha2VQaG90bygpIHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAzMDAsXG4gICAgICAgICAgICBrZWVwQXNwZWN0UmF0aW86IHRydWUsXG4gICAgICAgICAgICBzYXZlVG9HYWxsZXJ5OiB0cnVlXG4gICAgICAgIH07XG4gICAgY2FtZXJhLnRha2VQaWN0dXJlKG9wdGlvbnMpXG4gICAgICAgIC50aGVuKGltYWdlQXNzZXQgPT4ge1xuICAgICAgICAgICAgaW1hZ2VTb3VyY2UuZnJvbUFzc2V0KGltYWdlQXNzZXQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlID0gcmVzO1xuICAgICAgICAgICAgICAgIC8vc2F2ZSB0aGUgc291cmNlIGltYWdlIHRvIGEgZmlsZSwgdGhlbiBzZW5kIHRoYXQgZmlsZSBwYXRoIHRvIGZpcmViYXNlXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlVG9GaWxlKHRoaXMuaW1hZ2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtPiBcIiArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG59XG5cbnNhdmVUb0ZpbGUocmVzKXtcbiAgbGV0IGltZ3NyYyA9IHJlcztcbiAgICAgICAgdGhpcy5pbWFnZVBhdGggPSB0aGlzLnV0aWxzU2VydmljZS5kb2N1bWVudHNQYXRoKGBwaG90by0ke0RhdGUubm93KCl9LnBuZ2ApO1xuICAgICAgICBpbWdzcmMuc2F2ZVRvRmlsZSh0aGlzLmltYWdlUGF0aCwgZW51bXMuSW1hZ2VGb3JtYXQucG5nKTsgICAgICAgXG59XG5cblxuZWRpdEdpZnQoaWQ6IHN0cmluZyl7XG4gIGlmKHRoaXMuaW1hZ2Upe1xuICAgIC8vdXBsb2FkIHRoZSBmaWxlLCB0aGVuIHNhdmUgYWxsXG4gICAgdGhpcy5maXJlYmFzZVNlcnZpY2UudXBsb2FkRmlsZSh0aGlzLmltYWdlUGF0aCkudGhlbigodXBsb2FkZWRGaWxlOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLnVwbG9hZGVkSW1hZ2VOYW1lID0gdXBsb2FkZWRGaWxlLm5hbWU7XG4gICAgICAgICAgLy9nZXQgZG93bmxvYWRVUkwgYW5kIHN0b3JlIGl0IGFzIGEgZnVsbCBwYXRoO1xuICAgICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldERvd25sb2FkVXJsKHRoaXMudXBsb2FkZWRJbWFnZU5hbWUpLnRoZW4oKGRvd25sb2FkVXJsOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmVkaXRHaWZ0KGlkLHRoaXMuZGVzY3JpcHRpb24sZG93bmxvYWRVcmwpLnRoZW4oKHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgICAgICAgYWxlcnQocmVzdWx0KVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgIGFsZXJ0KCdGaWxlIHVwbG9hZCBlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgfSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy9qdXN0IGVkaXQgdGhlIGRlc2NyaXB0aW9uXG4gICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuZWRpdERlc2NyaXB0aW9uKGlkLHRoaXMuZGVzY3JpcHRpb24pLnRoZW4oKHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgYWxlcnQocmVzdWx0KVxuICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICB9KTtcbiAgfSAgICBcbn1cblxufSJdfQ==