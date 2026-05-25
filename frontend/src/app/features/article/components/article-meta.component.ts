import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Article } from '../models/article.model';
import { ArticlesService } from '../services/articles.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-article-meta',
  template: `
    @if (article) {
      <div class="article-meta">
        <a [routerLink]="['/profile', article.author.username]">
          <img [src]="article.author.image || '/assets/default-avatar.svg'" />
        </a>

        <div class="info">
          <a class="author" [routerLink]="['/profile', article.author.username]">
            {{ article.author.username }}
          </a>
          <span class="date">
            {{ article.createdAt | date: 'longDate' }}
          </span>
        </div>

        <ng-content></ng-content>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe],
})
export class ArticleMetaComponent implements OnInit {
  @Input() slug!: string;
  article?: Article;

  private articlesService = inject(ArticlesService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.articlesService
      .get(this.slug)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(article => {
        this.article = article;
        this.cdr.markForCheck();
      });
  }
}
