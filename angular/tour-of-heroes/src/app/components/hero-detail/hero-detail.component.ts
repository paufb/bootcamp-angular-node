import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../../models/hero.interface';

@Component({
  selector: 'app-hero-detail',
  imports: [FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  @Input({ required: true }) hero!: Hero;
}
