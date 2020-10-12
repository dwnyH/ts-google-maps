// Instruction to every class
// on how they can be an argument to 'addMarker'
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  // 이렇게 추가하려면 implemets를 이용해 해당 클래스에도 필요한 property를 알려주는 것이 좋음
  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  // addMarker(mappable: User | Company): void {
  // 이런식으로 중복을 줄일 수도 있고, 동작하지만 좋은 코드는 아님
  // => mappable 인자에 추가되는 type이 훨씬 많아질 수 있음.
  // 1) not scalable, 2) very tight coupling
  // solution: Interface
  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
