import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[customHover]',
})
export class HoverDirective {
    @HostBinding('style.color') color: string = '#000'
    @Input() defaultColor: string = '#fff'
    @Input('customHover') hoverColor: string = '#c3c3c3'

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', this.defaultColor);
  }
  @HostListener('mouseenter') onMouseEnter(){
    this.renderer.setStyle(this.elRef.nativeElement,'backgroundColor',this.hoverColor)
    this.color = 'darkblue'
  }

  @HostListener('mouseout') onMouseOut() {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', this.defaultColor);
    this.color = '#000'
  }
}
